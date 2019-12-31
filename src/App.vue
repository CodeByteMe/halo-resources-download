<template>
  <div id="app">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1
            class="title"
            style="font-size:3rem;"
          >
            Halo
          </h1>
          <h2 class="subtitle">
            Resources download
          </h2>
        </div>
      </div>
    </section>
    <section
      class="section"
      style="min-height: calc(100vh - 3.25rem);"
    >
      <div class="container">
        <nav
          class="breadcrumb"
          aria-label="breadcrumbs"
        >
          <ul>
            <li><a href="/">Index</a></li>
            <li><a href="#">release</a></li>
          </ul>
        </nav>
        <div class="card">
          <div class="card-content">
            <div class="table-container">
              <table class="table is-hoverable is-fullwidth is-striped is-narrow">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Modified</th>
                    <th>Control</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(file,index) in files"
                    :key="index"
                  >
                    <th>{{ file.name }}</th>
                    <td v-if="file.dir">—</td>
                    <td v-else>
                      {{ file.size | fileSizeFormat }}
                    </td>
                    <td>{{ file.dir?'—':file.last_modified }}</td>
                    <td>
                      <div class="buttons">
                        <button
                          :disabled="file.dir"
                          class="button is-primary is-small"
                          @click="handleCopyDownloadUrl(file.download_url)"
                        >Copy link</button>
                        <a
                          v-if="!file.dir"
                          :href="file.download_url"
                          class="button is-light is-small"
                        >Download</a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer
      class="footer"
      style="padding:2rem 1.5rem 2rem"
    >
      <div class="content has-text-centered">
        <p>
          <strong>Made</strong> by <a
            href="https://halo.run"
            target="_blank"
          >halo-dev</a>.<br /><br />
          <a href="https://bulma.io">
            <img
              src="https://bulma.io/images/made-with-bulma.png"
              alt="Made with Bulma"
              width="128"
              height="24"
            >
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      files: [
        {
          dir: true,
          size: 0,
          name: "test/",
          path: "release/test/",
          last_modified: "2019-12-31T14:44:44.316995073+08:00",
          download_url: ""
        },
        {
          dir: false,
          size: 72196811,
          name: "halo-1.1.0.jar",
          path: "release/halo-1.1.0.jar",
          last_modified: "2019-09-11T13:58:50Z",
          download_url: "http://halo.ryanc.cc/release/halo-1.1.0.jar"
        },
        {
          dir: false,
          size: 72199720,
          name: "halo-1.1.1.jar",
          path: "release/halo-1.1.1.jar",
          last_modified: "2019-09-26T07:42:18Z",
          download_url: "http://halo.ryanc.cc/release/halo-1.1.1.jar"
        },
        {
          dir: false,
          size: 72199720,
          name: "halo-latest.jar",
          path: "release/halo-latest.jar",
          last_modified: "2019-09-28T00:49:20Z",
          download_url: "http://halo.ryanc.cc/release/halo-latest.jar"
        }
      ]
    };
  },
  methods: {
    handleCopyDownloadUrl(url) {
      this.$copyText(url)
        .then(() => {
          this.$message({
            message: "Copy succeeded!",
            type: "success",
            showClose: true
          });
        })
        .catch(() => {
          this.$message({
            message: "Copy failed!",
            type: "error",
            showClose: true
          });
        });
    }
  }
};
</script>