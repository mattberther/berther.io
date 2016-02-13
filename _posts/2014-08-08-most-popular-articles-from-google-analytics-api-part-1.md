---
title: Most Popular articles from Google Analytics API, Part 1
disqus_identifier: 2014-08-08-most-popular-articles-from-google-analytics-api-part-1
comments: true
---

Adding a page that lists the most popular articles from your website using data from Google Analytics is a relatively straightforward process. Recently, I added [this feature][2] to this site. This article intends to walk you through how to set up your application to access data from the Google API.

## Enabling API access
Before we are able to query the Google API, we will need to visit the [Google Developers Console][1]. Once there, click Create Project to create a new project that will be used to control the APIs you will interact with.

After the project has been created, select apis under the apis & auth section in the left navigation. This will bring a list of all the Google APIs that your project can access. For this feature, we are interested in activating the Analytics API, so go ahead do do that. 

![Analytics API turned on][analytics]

After you enable the Analytics API, select the Credentials link in the left navigation and then click on Create New Client ID. Since we're calling the API on behalf of our application, create a new Service Account. After the service account is created, select Generate new P12 key and make note of the private key's password. This step will also download a key file to your computer. You'll need to copy this key file to a location that your application can access.

To move on to the next step, you will need the following items. Make sure you have all of these before you move on.

  * The private key password
  * The p12 file
  * The service account's email address

Now, we need to enable the Google service account to access our analytics data. To do this, log in to Google Analytics and select the Admin tab. Under the View section, select User Management and add permissions for the Google service account email address to read and analyze your analytics data.

To query the API, you will also need your Google profile ID, which can be found under View Settings in the Admin section. 

![Finding your profile ID][view_settings]

## Writing the Code
From the previous step, you should now have four items:

  * The private key password
  * The p12 file
  * The email address of the service account
  * The profile ID of your Google Analytics property


In this section, we will use the google-api-client Ruby gem to interact with the Analytics API and return a list of most popular posts.

Before we go any further, we'll need to add the google-api-client to our Gemfile:

``` ruby
gem 'google-api-client'
```

After we bundle our app, we can then start creating a class to interact with the API. This class needs to do a couple of things:

  1. Initialize the Google::APIClient
  2. Authorize the client using the keys and account information from the previous step
  3. Discover the API
  4. Execute the API method

To get started, let's initialize the Google APIClient. The constructor allows you to specify an application name and application version. To make this generic, let's allow our wrapper class to accept these parameters.

``` ruby
require 'google/api_client'

class AnalyticsAPI
  def initialize(app_name, app_version)
    @client = Google::APIClient.new(
      application_name: app_name,
      application_version: app_version)
  end

  private

  def key_file; '/path/to/key.p12'; end
  def key_password; 'privatekeypassword'; end
  def service_account; 'serviceaccount@email.address'; end
  def profile_id; '123456'; end
end
```

Now that we have a Google APIClient instantiated, let's build the authorize method. Authorization uses OAuth2 and is signed with the p12 key downloaded from the previous step. The method looks like this:

``` ruby
class AnalyticsAPI
  # previous methods omitted

  private

  def authorize!
    key = Google::APIClient::KeyUtils.load_from_pkcs12(key_file, key_password)

    @client.authorization = Signet::OAuth2::Client.new(
      token_credential_uri: 'https://accounts.google.com/o/oauth2/token',
      audience: 'https://accounts.google.com/o/oauth2/token',
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
      issuer: service_account,
      signing_key: key)

    @client.authorization.fetch_access_token!
  end
end
```

The Google APIClient allows us to discover the API, so we'll create a helper method that returns the discovered API which our method can then use to interact with the API.

``` ruby
class AnalyticsAPI
  # previous methods omitted
  
  private

  def api
    api_version = 'v3'
    @client.discovered_api('analytics', api_version)
  end
end
```

Now, we've got the infrastructure in place to query the analytics api. We'll do that with the following method:

``` ruby
class AnalyticsAPI
  # previous methods omitted


  def most_popular
    authorize!
    @client.execute(api_method: api.data.ga.get,
      parameters: {
        'ids'        => "ga:#{profile_id}",
        'start-date' => DateTime.now.prev_month.strftime('%Y-%m-%d'),
        'end-date'   => DateTime.now.strftime('%Y-%m-%d'),
        'dimensions' => 'ga:pagePath,ga:pageTitle',
        'metrics'    => 'ga:pageviews',
        'sort'       => '-ga:pageviews'
      }).data.rows
  end
end
```

We now have a class that can query the Analytics API and return a list of the URLs and titles of our most popular articles for the previous month sorted in descending order by the number of page views. Now, lets look at some enhancements we can make to the class to make it more flexible. We'll look at that in [part two][3], coming soon. For now, the class we have created is presented in its entirety below:

``` ruby
class AnalyticsAPI
  def initialize(app_name, app_version)
    @client = Google::APIClient.new(
      application_name: app_name,
      application_version: app_version)
  end

  def most_popular
    authorize!
    @client.execute(api_method: api.data.ga.get,
      parameters: {
        'ids'        => "ga:#{profile_id}",
        'start-date' => DateTime.now.prev_month.strftime('%Y-%m-%d'),
        'end-date'   => DateTime.now.strftime('%Y-%m-%d'),
        'dimensions' => 'ga:pagePath,ga:pageTitle',
        'metrics'    => 'ga:pageviews',
        'sort'       => '-ga:pageviews'
      }).data.rows
  end

  private

  def authorize!
    key = Google::APIClient::KeyUtils.load_from_pkcs12(key_file, key_password)

    @client.authorization = Signet::OAuth2::Client.new(
      token_credential_uri: 'https://accounts.google.com/o/oauth2/token',
      audience: 'https://accounts.google.com/o/oauth2/token',
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
      issuer: service_account,
      signing_key: key)

    @client.authorization.fetch_access_token!
  end

  def api
    api_version = 'v3'
    @client.discovered_api('analytics', api_version)
  end

  def key_file; '/path/to/key.p12'; end 
  def key_password; 'privatekeypassword'; end
  def service_account; 'serviceaccount@email.address'; end
  def profile_id; '123456'; end  
end
```

[1]:https://console.developers.google.com
[2]:/popular
[analytics]:/uploads/2014/08/analytics_api.png "Turning on Analytics API"
[view_settings]:/uploads/2014/08/view_settings.png "Finding your Profile ID"
[3]:/2014/08/11/most-popular-articles-from-google-analytics-api-part-2
