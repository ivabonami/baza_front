<template>
  <h1>Добавить услуг в проект:</h1>

  <div class="add-project form-wrapper">
    <div class="left">
      <div class="input-wrapper">
        <input
            type="text"
            placeholder="Название проекта"
            v-model="productName"
            minlength="5" maxlength="30"
            ref="productName"
            required>
        <span class="help">
          Введите название проекта, которое коротко и ясно отражает его суть. От 5 до 30 символов.
        </span>
      </div>


      <div class="input-wrapper">
        <div class="fake-input">
          <span class="name">Аватарка *</span>
          <input type="file"
                 ref="projectAvatar"
                 v-on:change="uploadAvatar($event)"
                 accept="image/*"
          >
        </div>
        <span class="help">
          Загрузите изображение услуги, размеры 230x170px, форматы: jpeg, jpg, gif. webp
        </span>
      </div>

      <textarea placeholder="описание проекта *"
                required
                ref="productDescription"
                v-model="productDescription"></textarea>
      <span class="help">
        Предоставьте подробное описание услуги, включая еу цель, описание продаваемого товара, что бы пользователь точно понимал что он покупает.
      </span>


      <button class="btn btn-filled"
              v-on:click="checkForm()">
        Добавить услугу
      </button>

    </div>

    <div class="errors" ref="errors" v-if="this.errors.length > 0">
      <h3>Устраните ошибки:</h3>
      <div class="error" v-for="(error, index) of errors" >
        {{ index + 1 }}) {{ error }}

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "AddService.vue",
  props: ['projectId'],

  data () {
    return {
      productDescription: '',
      projectAvatar: '',
      productName: '',
      counter: 0,
      errors: [],
      addedId: 0,
    }
  },

  methods: {
    addProduct () {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);


      fetch(`http://62.113.96.171:3000/products`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          name: this.productName,
          avatarFilePath: this.projectAvatar,
          description: this.productDescription,
          projectId: this.$props.projectId,

        })
      })
          .then((response) => response.json())
          .then(response => console.log(response))
          .catch((error) => {console.error(error)});
    },



    uploadAvatar(e){
      this.projectAvatar = e.target;
      const image = e.target.files[0]

      console.log(image)
      const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "image/webp");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      const formData = new FormData();
      formData.append("image-upload", image );

      console.log(formData)
      fetch("http://62.113.96.171:3000/image-upload", {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow"
      })
          .then((response) => response.json())
          .then((result) => this.projectAvatar = result.filePath)
          .catch((error) => console.error(error));
    },

    checkForm () {
      this.errors = []

      if (this.productName.length < 4) {
        this.errors.push('Название услуги должно быть не менее 4 символов')
        this.$refs.productName.style.borderColor = 'red'
      } else {
        this.$refs.productName.style.borderColor = '#6C7AFF'
      }

      if (this.productDescription.length < 30) {
        this.errors.push('Описание услуги должно быть не менее 30 символов')
        this.$refs.productDescription.style.borderColor = 'red'
      } else {
        this.$refs.productDescription.style.borderColor = '#6C7AFF'
      }

      if (this.projectAvatar.length === 0) {
        this.errors.push('Изображение не загружено')
        this.$refs.projectAvatar.parentElement.style.borderColor = 'red'
      } else {
        this.$refs.projectAvatar.parentElement.style.borderColor = '#6C7AFF'
      }

      if (this.errors.length > 0 ) {
        setTimeout(()=> {
          this.$refs.errors.scrollIntoView({ behavior: 'smooth', block: 'center'})
        }, 20)
      } else {
        this.addProduct();
        this.counter++
        this.$emit('added',this.counter )
      }
    }
  }
}
</script>

<style scoped lang="scss">
.btn {
  margin-top: 20px;
}

.add-project {
  display: flex;
  gap: 2%;
  flex-wrap: wrap;
  justify-content: space-between;
  .left {
    width: 100%;
  }

  .help {
    color: #000;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    margin-top: 7px;

    opacity: 0.5;
    display: block;
  }
}

.errors {
  margin-top: 10px;
  background-color: #ffdada;
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;

  .error {
    margin-bottom: 5px;
    margin-top: 5px;
  }
}

</style>