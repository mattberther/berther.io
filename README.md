# matt.berther.io

Personal blog at <https://matt.berther.io>. Jekyll with the [chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) theme, deployed to AWS S3 + CloudFront via GitHub Actions.

## Stack

- **Static site:** Jekyll with `jekyll-theme-chirpy`
- **Runtime:** Ruby. See [`.ruby-version`](.ruby-version) for the pinned version.
- **Hosting:** AWS S3 (origin) + CloudFront (CDN, TLS, edge functions)
- **CI/CD:** GitHub Actions. Builds on every push, deploys `master` to production.

Also serves: `berther.io`, `www.berther.io`, `mattberther.com`, `www.mattberther.com` (all aliased to the same CloudFront distribution via a single multi-domain ACM certificate).

## Local development

Clone with submodules to pull in chirpy's bundled JS dependencies at `assets/lib/`:

```bash
git clone --recurse-submodules <repo-url>
cd berther.io
```

If you cloned without submodules:

```bash
git submodule update --init --recursive
```

Install dependencies and run the dev server:

```bash
bundle install
bundle exec jekyll serve
```

Open <http://localhost:4000>.

## Repository structure

```
_config.yml           Jekyll site configuration
Gemfile               Ruby gem dependencies
index.html            Home page entry point
_posts/               Blog posts
_tabs/                Sidebar nav tabs (about, resume, pgp)
_data/locales/        Custom tab labels for chirpy's locale lookup
_plugins/             Custom Liquid plugins
attachments/          Post attachments (images, video, downloads)
assets/lib/           Submodule for chirpy's bundled JS dependencies
key.asc               PGP public key (inlined into _tabs/pgp.md at build)
.github/workflows/    GitHub Actions CI/CD definition
```

## Deployment

GitHub Actions workflow at `.github/workflows/build.yml`:

1. Every push and pull request builds and uploads a `_site` artifact.
2. Push to `master` runs the deploy job: `aws s3 sync _site/` to the `matt.berther.io` bucket with `--delete`, then invalidates CloudFront.

Required GHA secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_CLOUDFRONT_ID`.

## Edge logic

A CloudFront Function (`berther-redirect-p`) handles two redirect concerns on viewer-request:

- **Legacy WordPress URLs.** `/?p=N` → real post URL via a CloudFront Key Value Store (`berther-redirects`) populated from the historical post-ID mapping. Preserves inbound search traffic and old links.
- **Asset path rename.** `/uploads/*` → `/attachments/*`, preserving external links to images and downloads referenced before the rename.

## Customizations on top of chirpy

- **`_plugins/read_file.rb`.** Liquid tag that inlines a repo file's contents into a post or tab. Used on `_tabs/pgp.md` to embed `key.asc` so the key lives in only one place on disk.
- **`_data/locales/en.yml`.** Overrides chirpy's tab labels. Required for custom tabs (resume, pgp) to populate the `<title>` element and sidebar nav text. Chirpy looks up labels by filename, not by the front-matter `title:` field, so custom tabs need entries here.
- **Permalink format.** `/:year/:month/:day/:title/`. Preserved from the original WordPress export so legacy URLs and the CloudFront KVS redirect mapping remain valid.

## Upgrading chirpy

1. Check chirpy's [release notes](https://github.com/cotes2020/jekyll-theme-chirpy/releases) for breaking changes.

2. Update the gem:

   ```bash
   bundle update jekyll-theme-chirpy
   ```

3. Diff any locally-overridden files against the new gem version. The locale file is the main one. Jekyll's theme inheritance replaces it wholesale, so new keys upstream need to be pulled in manually:

   ```bash
   diff _data/locales/en.yml "$(bundle show jekyll-theme-chirpy)/_data/locales/en.yml"
   ```

4. Check the `assets/lib/` submodule for upstream changes and update if the new chirpy version pins a newer asset set.

5. Test locally with `bundle exec jekyll serve`. Spot-check the home page, a post, the sidebar nav, search, and each custom tab.

6. Commit the `Gemfile.lock` update (and submodule pointer if applicable), push, and verify the production deploy.

## License

- **Chirpy theme.** Licensed separately by the chirpy maintainers. See the [chirpy LICENSE](https://github.com/cotes2020/jekyll-theme-chirpy/blob/master/LICENSE).
- **This repo's custom code** (plugins, configuration, workflow). See [`LICENSE`](LICENSE).
- **Posts and content.** © Matt Berther, all rights reserved unless otherwise noted in a specific post.