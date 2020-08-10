<template>
  <div class="editInfo">
    <per-nav-temp :navtitle="'编辑资料'" @clickNav="backHandler('返回个人中心')"></per-nav-temp>
    <!-- 头像、昵称、密码、性别 -->
    <div class="infocontent">
      <div class="headimg" @click="handler('编辑头像')">
        <div class="uploaderWrapper">
          <van-uploader class :after-read="afterRead" :max-count="1" />
        </div>
        <img v-if="headimg" :src="'http://localhost:3000'+headimg" alt />
        <img v-else src="@/assets/images/d1.jpg" alt />
      </div>
      <p class="infotitle">
        <span>点击头像进行编辑</span>
      </p>
      <!-- 昵称、密码、性别子组件 -->
      <peropt-temp :msg1="'昵称'" :msg2="this.nickname" @emitclick="handler('nickname')"></peropt-temp>
      <peropt-temp :msg1="'密码'" :msg2="'******'" @emitclick="handler('password')"></peropt-temp>
      <peropt-temp :msg1="'性别'" :msg2="this.gender==1?'男':'女'" @emitclick="handler('gender')"></peropt-temp>
      <!-- 确认修改按钮 -->
      <button @click="editInfo" class="isChange">保存修改</button>
    </div>
    <!-- vant弹框组件 嵌套 输入框组件 -->
    <van-dialog @confirm="confirmNickname" v-model="showNicname" title="修改昵称" show-cancel-button>
      <van-field v-model="editnickname" :label="'昵称'" error-message="昵称不允许超过6位" />
    </van-dialog>
    <van-dialog @confirm="confirmPwd" v-model="showPwd" title="修改密码" show-cancel-button>
      <van-field v-model="editpwd" type="password" label="密码" error-message="密码需要6位以上" />
    </van-dialog>
    <!-- 修改心别组件 -->
    <van-dialog @confirm="confirmGender" v-model="showGender" title="修改性别" show-cancel-button>
      <van-radio-group v-model="editgender">
        <van-cell-group>
          <van-cell title="女" clickable @click="radio = '0'">
            <template #right-icon>
              <van-radio name="0" />
            </template>
          </van-cell>
          <van-cell title="男" clickable @click="radio = '1'">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
// 导入组件
import PeroptTemp from "@/components/PeroptTemp.vue";
import PerNavTemp from "@/components/PerNavTemp.vue";
export default {
  data() {
    return {
      nickname: "",
      gender: "",
      password: "",
      headimg: "",

      editnickname: "",
      editgender: "",
      editpwd: "",

      showGender: false,
      showNicname: false,
      showPwd: false,
    };
  },
  methods: {
    // 渲染页面的函数
    loadPage() {
      this.$axios({
        url: "/user/" + localStorage.getItem("userId"),
        method: "get",
      }).then((res) => {
        // console.log(res.data.data);
        this.nickname = res.data.data.nickname;
        this.gender = res.data.data.gender + "";
        this.password = res.data.data.password;

        this.editgender = res.data.data.gender + "";
        this.headimg = res.data.data.head_img;
      });
    },
    // 点击对应的peropt-temp对应的处理函数,显示对应的输入框
    handler(val) {
      if (val == "nickname") {
        this.showNicname = true;
      } else if (val == "password") {
        this.showPwd = true;
      } else if (val == "gender") {
        this.showGender = true;
      }
    },
    confirmNickname() {
      console.log("确认修改昵称" + this.editnickname);
      if (this.editnickname && /^.{1,6}$/.test(this.editnickname)) {
        this.nickname = this.editnickname;
      } else {
        this.$toast.fail("请输入符合规则的值!");
        this.editnickname = "";
      }
    },
    confirmPwd() {
      console.log("确认修改密码" + this.editpwd);
      if (this.editpwd && /^.{6,}$/.test(this.editpwd)) {
        this.password = this.editpwd;
      } else {
        this.$toast.fail("请输入符合规则的值!");
        this.editpwd = "";
      }
    },
    confirmGender() {
      console.log("确认修改性别" + this.editgender);
      this.gender = this.editgender + "";
    },
    // 上传图片后的回调函数
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file);
      // 通过file.file拿到图片之后，先用FormData转为二进制数据
      const formData = new FormData();
      // formData.append(字段名,图片文件)
      formData.append("file", file.file);

      // 发送axios请求 upload上传到服务器
      this.$axios({
        url: "/upload",
        method: "post",
        data: formData,
      }).then((res) => {
        console.log(res);
        if (res.data.message == "文件上传成功") {
          this.$toast.success(res.data.message);
          // console.log(res.data.data.url);
          this.headimg = res.data.data.url;
        } else {
          this.$toast.fail(res.message);
        }
      });
    },
    // PerNav组件返回对应的处理函数
    backHandler(msg) {
      console.log(msg);
      this.$router.push("/perinfo");
    },
    // 确认修改发送请求 修改信息
    editInfo() {
      console.log("保存修改");
      // 获取数据
      let password = this.password;
      let nickname = this.nickname;
      let head_img = this.headimg;
      let gender = this.gender;
      console.log(head_img);
      console.log(password);
      console.log(gender);
      // 发送axios请求 修改数据
      this.$axios({
        url: "/user_update/" + localStorage.getItem("userId"),
        method: "post",
        data: {
          password,
          nickname,
          head_img,
          gender,
        },
      })
        .then((res) => {
          // console.log(res.data);
          if (res.data.message == "修改成功") {
            this.$toast.success("修改成功");
            this.$router.push("/perinfo");
            // this.loadPage();
          } else {
            this.$toast.fail(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    PeroptTemp,
    PerNavTemp,
  },
  mounted() {
    //发送请求渲染个人中心数据
    this.loadPage();
    // this.$axios({
    //   url: "/user/" + this.$route.query.id,
    //   method: "get",
    // }).then((res) => {
    //   // console.log(res.data.data);
    //   this.nickname = res.data.data.nickname;
    //   this.gender = res.data.data.gender + "";
    //   this.password = res.data.data.password;

    //   this.editgender = res.data.data.gender + "";
    //   this.headimg = res.data.data.head_img;
    // });
  },
};
</script>

<style lang="less" scoped>
.editInfo {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f2f2f2;
  height: 100vh;

  .infocontent {
    padding-left: 20/360 * 100vw;
    .headimg {
      display: flex;
      position: relative;
      width: 70/360 * 100vw;
      height: 70/360 * 100vw;
      margin: 20/360 * 100vw auto 5/360 * 100vw;
      border-radius: 50%;
      border: 1px solid #fff;
      overflow: hidden;
      object-fit: contain;
      .uploaderWrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        .van-uploader {
          width: 100%;
          height: 100%;
          text-align: center;
        }
      }
      img {
        width: 70/360 * 100vw;
      }
    }
    .infotitle {
      span {
        color: rgb(153, 152, 152);
      }
      margin-bottom: 20/360 * 100vw;
      font-size: 12/360 * 100vw;
      text-align: center;
    }

    .isChange {
      display: block;
      width: 200/360 * 100vw;
      height: 36/360 * 100vw;
      border-radius: 18/360 * 100vw;
      background: #bebdbd;
      border: none;
      font-size: 16/360 * 100vw;
      color: #fff;
      margin: 20/360 * 100vw auto;
    }
  }
}
</style>