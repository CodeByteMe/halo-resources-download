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
    <section class="section">
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

    <section class="section">
      <div class="container">
        <div class="card">
          <div class="card-content">
            <h1 class="title">说明</h1>
            <h2 class="subtitle">
              由于 Github 上的资源下载对于部分朋友来说速度实在太慢，所以我们将资源同时放在了阿里的 OSS，方便大家的下载。不过需要注意的是，如果你的服务器是海外的话，最好还是去 <a
                href="https://github.com/halo-dev/halo/releases"
                target="_blank"
              >Github</a> 下载资源，不仅可以下载更快，还可以为我们节省一点流量费用。另外，目前的费用都是我们自费，如果该站帮助到了你，可以适当捐赠以帮助该站运营下去。可扫描下方二维码（支付宝/微信/QQ）进行捐赠。
            </h2>
            <img
              src="https://i.loli.net/2018/12/23/5c1f68ce9b884.png"
              width="200"
              style="border: 2px dashed #00d1b2;"
            />
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
