require 'dotenv'
Dotenv.load

module Jekyll
  module MostPopularFilter
    def most_popular(input, limit = 10)
      api ||= GrayIron::GoogleAPI.new('berther.io website', '1.0.0')
      options = { 'start-date' => '2005-01-01', 'max-results' => limit, 'filters' => 'ga:pagePath=~^\/\d{4}\/\d{2}\/\d{2}[^/]*'}

      api.most_popular(options).map do |a|
        a << '/' unless a.end_with?('/')
        input.find { |post| post.url == a }
      end

    end
  end
end

Liquid::Template.register_filter(Jekyll::MostPopularFilter)
