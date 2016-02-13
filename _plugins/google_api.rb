require 'google/api_client'

module GrayIron
  class GoogleAPI
    API_VERSION = 'v3'
    CACHED_API_FILE = "analytics-#{API_VERSION}.cache"

    def initialize(app_name, app_version)
      @client = Google::APIClient.new(
        application_name: app_name,
        application_version: app_version)
    end

    def most_popular(options = {})
      authorize!
      @client.execute(api_method: api.data.ga.get,
                      parameters: parameters.merge(options)
                     ).data.rows.map { |a| a[0] }
    end

    private

    def authorize!
      key = Google::APIClient::KeyUtils.load_from_pkcs12(ENV['KEY_FILE'], ENV['KEY_SECRET'])

      @client.authorization = Signet::OAuth2::Client.new(
        token_credential_uri: 'https://accounts.google.com/o/oauth2/token',
        audience: 'https://accounts.google.com/o/oauth2/token',
        scope: 'https://www.googleapis.com/auth/analytics.readonly',
        issuer: ENV['SERVICE_ACCOUNT'],
        signing_key: key)

      @client.authorization.fetch_access_token!
    end

    def api
      api = nil
      if File.exist? CACHED_API_FILE
        File.open(CACHED_API_FILE) { |f| api = Marshal.load(f) }
      else
        api = @client.discovered_api('analytics', API_VERSION)
        File.open(CACHED_API_FILE, 'w') { |f| Marshal.dump(api, f) }
      end

      api
    end

    def parameters
      {
        'ids'         => "ga:#{ENV['PROFILE_ID']}",
        'start-date'  => DateTime.now.prev_month.strftime('%Y-%m-%d'),
        'end-date'    => DateTime.now.strftime('%Y-%m-%d'),
        'dimensions'  => 'ga:pagePath',
        'metrics'     => 'ga:pageviews',
        'sort'        => '-ga:pageviews'
      }
    end
  end
end
