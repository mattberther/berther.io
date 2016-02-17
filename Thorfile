require 'thor'

class Post < Thor

  desc 'new', 'create a new post'
  def new
    title = ask('title: ')
    # add check to ensure title isnt blank

    slug = "#{Date.today}-#{title.downcase.gsub(/[^\w]+/, '-')}"

    path = File.join(
      File.dirname(__FILE__),
      '_posts',
      slug + '.md')

    if File.exist? path
      puts "cant create the post, #{path} already exists."
    else
      File.open(path, 'w') do |f|
        f << <<-EOS.gsub(/^    /, '')
        ---
        title: #{title}
        disqus_identifier: #{slug}
        published: false
        comments: true
        ---

        EOS
      end

      puts "a post was created for you at #{path}."
    end

    system("#{config.editor} #{path}")

  end

  desc 'publish', 'push latest changes'
  def publish
    branch = ask('Branch (master):')
    branch = 'master' if branch.empty?

    puts 'publishing your article(s)...'
    `git push #{config[:remote]} #{branch}`
  end

  desc 'unpublished', 'list unpublished posts'
  def unpublished
    puts "Unpublished Drafts: "
    puts `find ./_posts -type f -exec grep -H 'published: false' {} \\;`
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
