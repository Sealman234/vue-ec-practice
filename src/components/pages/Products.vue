<template>
  <div>
    <div class="text-right mt-4">
      <!-- Modal：https://getbootstrap.com/docs/4.4/components/modal/#live-demo -->

      <!-- Button trigger modal -->
      <!-- 原先：data-toggle="modal" data-target="#productModal" -->
      <!-- 改為：透過 method 打開 Modal (元件頁面要記得 import jQuery) -->
      <button class="btn btn-primary" @click="openModal(true)">建立新產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <!-- 可以只調整 "要限制寬度" 的 th，剩下的 th 會自動調整 -->
        <th width="100">分類</th>
        <!-- 以這邊來說，產品名稱最需要空間，所以其他部分都限制寬度，把最多的剩餘空間通通給產品名稱 -->
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <!-- 金額靠右 -->
          <td class="text-right">{{ item.origin_price }}</td>
          <td class="text-right">{{ item.price }}</td>
          <td>
            <!-- 產品如果為啟用：is_enabled == 1 -->
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button class="btn btn-sm btn-outline-primary" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-sm btn-outline-danger" @click="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- productModal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files" />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delProductModal" -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"; // 元件頁面要記得 import jQuery

export default {
  data() {
    return {
      products: [],
      tempProduct: {}, // 綁定所有的欄位後，用 POST 將 tempProduct 裡的資料新增到資料庫
      isNew: false
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      // 取得產品資料
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products`; // 加上 admin 才是管理者使用的
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      this.$http.get(api).then(response => {
        console.log(response.data);
        // 存回 vm ...
        vm.products = response.data.products;
        console.log(vm.products);
      });
    },
    openModal(isNew, item) {
      // 按下按鈕後，等 AJAX 完成才開啟 Modal
      // https://getbootstrap.com/docs/4.4/components/modal/#modalshow
      // $("#productModal").modal("show");

      // 新舊判斷
      if (isNew) {
        // 如果是新增
        this.tempProduct = {}; // tempProduct = 空物件
        this.isNew = true; // 新的
      } else {
        // this.tempProduct = item; // 物件傳參考特性
        this.tempProduct = Object.assign({}, item); // (ES6) 將 item 的值寫到一個空物件 (而且可以避免傳參考的特性之問題)
        this.isNew = false;
      }
      $("#productModal").modal("show"); // 延後到這裡才打開 Modal
    },
    updateProduct() {
      // 商品建立
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      const vm = this;

      let httpMethod = "post";
      if (!vm.isNew) {
        // 如果不是新的，是"修改"，就改 api
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`; // :id => ${vm.tempProduct.id}
        // HTTP 行為也要改為 put
        httpMethod = "put";
      }

      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      // 符合格式 data : {...}
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          // 如果新增成功，就把 Modal 關閉
          // .modal('hide')：https://getbootstrap.com/docs/4.4/components/modal/#modalhide
          $("#productModal").modal("hide");
          // 並且再重新取得一次遠端的資料 (更新畫面)
          vm.getProducts();
        } else {
          // 如果新增失敗，做一樣的動作，但是再補上 console.log
          $("#productModal").modal("hide");
          vm.getProducts();
          console.log("新增失敗");
        }
      });
    },
    openDelModal(item) {
      this.tempProduct = Object.assign({}, item);
      $("#delProductModal").modal("show");
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      this.$http.delete(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          // 如果刪除成功，就把 Modal 關閉，並更新遠端資料與畫面
          $("#delProductModal").modal("hide");
          vm.getProducts();
        } else {
          // 如果刪除失敗，一樣關閉 Modal 與更新畫面，但是再補上 console.log
          $("#delProductModal").modal("hide");
          vm.getProducts();
          console.log("刪除失敗");
        }
      });
    }
  },
  created() {
    // 加上 created 的 hook 觸發 getProducts 事件 (init)
    this.getProducts();
  }
};
</script>
