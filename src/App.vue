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
          <ul v-if="prefixs.length>0">
            <li><a href="/">index</a></li>
            <li
              v-for="(prefix,index) in prefixs"
              :key="index"
            ><a
                href="javascript:void(0);"
                @click="handleListFiles(prefix+'/')"
              >{{ prefix }}</a></li>
          </ul>
        </nav>
        <div class="card">
          <div class="card-content">
            <div class="table-container">
              <progress
                v-if="loading"
                class="progress is-small is-primary"
                max="100"
              >15%</progress>
              <table
                v-else
                class="table is-hoverable is-fullwidth is-striped is-narrow"
              >
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
                    v-for="(file, index) in files"
                    :key="index"
                  >
                    <th v-if="file.dir">
                      <a
                        href="javascript:void(0)"
                        @click="handleListFiles(file.path)"
                      >{{ file.name }}</a>
                    </th>
                    <th v-else>{{ file.name }}</th>
                    <td v-if="file.dir">—</td>
                    <td v-else>
                      {{ file.size | fileSizeFormat }}
                    </td>
                    <td>{{ file.dir ? "—" : file.last_modified }}</td>
                    <td>
                      <div class="buttons">
                        <button
                          :disabled="file.dir"
                          class="button is-primary is-small"
                          @click="handleCopyDownloadUrl(file.download_url)"
                        >
                          Copy link
                        </button>
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
          <strong>Made</strong> by
          <a
            href="https://halo.run"
            target="_blank"
          >halo-dev</a>.<br /><br />
          <a href="https://bulma.io">
            <img
              src="https://bulma.io/images/made-with-bulma.png"
              alt="Made with Bulma"
              width="128"
              height="24"
            />
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { list } from "./api/oss";
export default {
  name: "app",
  data() {
    return {
      files: [],
      prefixs: [],
      loading: false
    };
  },
  created() {
    this.handleListFiles();
  },
  methods: {
    handleListFiles(prefix) {
      this.loading = true;
      if (prefix) {
        this.prefixs = prefix.split("/");
      }
      list(prefix).then(res => {
        this.files = res.data;
        this.loading = false;
      });
    },
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
