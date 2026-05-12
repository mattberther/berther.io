module Jekyll
    class ReadFile < Liquid::Tag
        def initialize(tag_name, file_path, tokens)
            super
            @file_path = file_path.gsub(/\A[[:space:]"']+|[[:space:]"']+\z/, '')
        end

        def render(context)
            site = context.registers[:site]
            File.read(File.join(site.source, @file_path))
        end
    end
end

Liquid::Template.register_tag('read_file', Jekyll::ReadFile)
