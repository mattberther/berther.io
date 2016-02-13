---
title: Most Popular articles from Google Analytics API, Part 2
disqus_identifier: 2014-08-11-most-popular-articles-from-google-analytics-api-part-2
comments: true
---

In [part one][1] of this series, we set up the Google API and created a simple class that interacts with the API to return the most popular articles from Google Analytics. We can make a few enhancements to the class from the previous series to make things a little better. These enhancements include:

* filtering and limiting the number of results that come back
* caching the discovered API so we dont have a round trip on every access
* security enhancements to avoid storing credentials in your source code repository

### Filtering and limiting
By default, the Google API client returns a large number of resources. For this website, I wanted to only return the ten most popular articles. I also wanted to filter certain pages from the result set. For example, I did not want the home page showing up in the list of most popular articles. Fortunately, accomplishing both of those goals was as easy as adding some parameters to the api call.

Since we know that the articles on the site follow a certain naming convention (YYYY/MM/DD/slug), we can put together a simple regular expression to pass in to the filters parameter.

``` ruby
class AnalyticsAPI
  # previous methods omitted

  def most_popular
    authorize!
    @client.execute(api_method: api.data.ga.get,
      parameters: {
        'ids'         => "ga:#{profile_id}",
        'start-date'  => DateTime.now.prev_month.strftime('%Y-%m-%d'),
        'end-date'    => DateTime.now.strftime('%Y-%m-%d'),
        'dimensions'  => 'ga:pagePath,ga:pageTitle',
        'metrics'     => 'ga:pageviews',
        'sort'        => '-ga:pageviews',
        'max-results' => 10,
        'filters'     => 'ga:pagePath=~^\/\d{4}\/\d{2}\/\d{2}[^/]*'
      }).data.rows
  end
end
```

This is much better -- now we're only getting a small number of articles that we actually want to list on our most popular articles page.

### Caching
In the current implementation, the api method attempts to discover the Google API every time it is accessed. We can cache this non-changing data onto the file system and load from there, rather than over the network. Implementing the api caching is also easy to do. Update the api method this way:

``` ruby
class AnalyticsAPI
  # previous methods omitted

  def api
    api_version = 'v3'
    cached_api_file = "analytics-#{api_version}.cache"

    unless File.exist?(cached_api_file)
      @api = @client.discovered_api('analytics', api_version)
      File.open(cached_api_file, 'w') { |f| Marshal.dump(api, f) }
    end

    @api ||= Marshal.load(File.read(cached_api_file))
  end
end
```

This is also a nice improvement, especially for cases where the class is reused. The api discovery is now stored as an instance variable and loaded from file if the api has already been discovered.

### Security
The last piece to address is mostly an enhancement in the interest of security. As most of you probably know, a generally accepted way of storing secrets is to add them to the environment, rather than hardcoding them in your source code. To that end, we just need to update our four helper methods to read their values from the environment.

``` ruby
class AnalyticsAPI
  # previous methods omitted

  def key_file; ENV['KEY_FILE']; end 
  def key_password; ENV['KEY_PASSWORD']; end
  def service_account; ENV['SERVICE_ACCOUNT']; end
  def profile_id; ENV['PROFILE_ID']; end  
end
```

This concludes the enhancements for the AnalyticsAPI class -- and also this series. I hope that you learned how to activate and interact with the Google APIs in this series. For your reference, the entire AnalyticsAPI class is included below.

### Final class

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
        'sort'       => '-ga:pageviews',
        'max-results' => 10,
        'filters'     => 'ga:pagePath=~^\/\d{4}\/\d{2}\/\d{2}[^/]*'
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
    cached_api_file = "analytics-#{api_version}.cache"

    unless File.exist?(cached_api_file)
      @api = @client.discovered_api('analytics', api_version)
      File.open(cached_api_file, 'w') { |f| Marshal.dump(api, f) }
    end

    @api ||= Marshal.load(File.read(cached_api_file))
  end

  def key_file; ENV['KEY_FILE']; end 
  def key_password; ENV['KEY_PASSWORD']; end
  def service_account; ENV['SERVICE_ACCOUNT']; end
  def profile_id; ENV['PROFILE_ID']; end  
end
```

[1]:/2014/08/08/most-popular-articles-from-google-analytics-api-part-1