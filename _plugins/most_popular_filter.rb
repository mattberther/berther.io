require 'dotenv'
Dotenv.load

require 'googleauth'
require 'google/apis/analytics_v3'

module Jekyll
  module MostPopularFilter
    def most_popular(input, limit = 10)
      scopes = ['https://www.googleapis.com/auth/analytics.readonly']

      stats = Google::Apis::AnalyticsV3::AnalyticsService.new
      stats.authorization = Google::Auth.get_application_default(scopes)

      results = stats.get_ga_data("ga:#{ENV['PROFILE_ID']}", "2005-01-01", DateTime.now.strftime('%Y-%m-%d'),
                                  "ga:pageviews", dimensions: "ga:pagePath", sort: "-ga:pageviews",
                                  filters: 'ga:pagePath=~^\/\d{4}\/\d{2}\/\d{2}\/.*\/', max_results: limit)

      results.rows.map do |a|
        a[0] << '/' unless a[0].end_with?('/')
        input.find { |post| post.url == a[0] }
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::MostPopularFilter)
