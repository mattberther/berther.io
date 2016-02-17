require 'thor'

class Post < Thor
  include Thor::Actions

  desc 'new', 'create a new post'
  def new
    title = ask('title: ')
    # add check to ensure title isnt blank

    slug = "#{title.downcase.gsub(/[^\w]+/, '-')}"

    path = File.join('_drafts', slug + '.md')

    if File.exist? path
      puts "cant create the post, #{path} already exists."
    else
      create_file(path) do
<<-EOS
---
title: #{title}
disqus_identifier: #{slug}
comments: false
---
EOS
      end

      puts "a post was created for you at #{path}."
    end

    system("#{config.editor} #{path}")

  end

  desc 'push', 'push latest changes'
  def publish
    branch = ask('Branch (master):')
    branch = 'master' if branch.empty?

    puts 'publishing your article(s)...'
    `git push #{config[:remote]} #{branch}`
  end

  desc 'publish', 'promote posts from _drafts'
  def publish
    Dir["_drafts/*.md"].each do |path|
      text = File.read(path)
      text =~ /^\s*title: (.*)$/

      if yes?("Would you like to publish the post '#{$1}'")
        slug = "#{Date.today}-#{$1.downcase.gsub(/[^\w]+/, '-')}"

        text.gsub! /^(\s*disqus_identifier:).*$/, '\1 ' + slug
        text.gsub! /^(\s*comments:) false$/, '\1 true'

        File.open(path, "w") { |file| file.puts text }
        File.rename path, File.join('_posts', slug + '.md')
      end
    end
  end

  desc 'unpublished', 'list unpublished posts'
  def unpublished
    puts "Unpublished Drafts: "
    Dir["_drafts/*.md"].each do |path|
      text = File.read(path)
      text =~ /^\s*title: (.*)$/
      puts $1
    end
  end

  private
  def config
    @config ||= {
      author: 'Matt Berther',
      remote: 'origin',
      editor: 'subl'
    }
  end
end
