<template>
  <div class="modal">
    <div class="modal-wrapper">
      <div class="modal-header">
        <h3>Add Photo</h3>        
        <span class="close" @click="close"><i class="material-icons">close</i></span>
      </div>
      <div class="modal-content">                

        <div class="box" 
          v-if="visible.box"
          @click="selectFile">
          <i class="material-icons">insert_drive_file</i>
          <span>local file</span>          
        </div>        

        <div
          class="box" 
          v-if="visible.box"
          @click="selectUrl">
          <i class="material-icons">link</i>
          <span>photo url</span>
        </div>

        <transition name="fade">
          <div class="url" v-if="visible.url">
            <input class="input" type="text" v-model="imgURL" placeholder="type url...">
          </div>
        </transition>

        <input type="file" id="file" @change="filechange">
        
        <transition name="fade">
          <div class="thumbnail" v-if="visible.file">
            <img :src="dataURL">     
          </div>
        </transition>

      </div>
      <div class="modal-footer">
        <button @click="close" :style="{color: color}">cancel</button>
        <button @click="photoUpload" :style="{backgroundColor: color}">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import siiimpleToast from 'siiimple-toast';

const toast = new siiimpleToast();

export default {
  name: 'photoupload',
  props: [
    'close',
    'sendImage',
    'color',
  ],
  data() {
    return {
      photo: {
        type: '',
        data: '',
      },
      visible: {
        box: true,
        file: false,
        url: false,
      },
      dataURL: '',
      imgURL: ''
    }
  },
  watch: {
    imgURL(url) {
      this.photo = {
        type: 'text',
        data: url
      }
    }
  },
  methods: {
    selectFile() {      
      document.getElementById('file').click();
    },
    selectUrl() {
      this.visible.box = false;
      this.visible.url = true;
    },
    filechange(e) {      
      const file = e.target.files[0];
      // in IE, can't recognition file.type 
      const fileType = file.name.split('.').pop();      

      if(fileType != 'png' && fileType != 'gif' 
          && fileType != 'jpg' && fileType != 'jpeg'){
        toast.alert('Only photos can be uploaded');
        e.target.value = '';        
        return;
      }

      this.dataURL = URL.createObjectURL(file);            
      this.photo = {
        type: 'file',
        data: file
      }
      this.visible.box = false;
      this.visible.file = true;

      e.target.value = '';     
    },
    photoUpload() {
      if(this.photo.data == '' || this.photo.type == '') return;
      this.sendImage(this.photo);
    }
  }
}
</script>

<style scoped>
/* transition css */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* template css */
input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}
.modal-content{
  display: flex;
  justify-content: space-around;
  text-align: center;
  transition: all 0.3s;
}
.modal-content .box{
  padding: 1.75rem 2rem;
  border-radius: 1rem;  
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  cursor: pointer;
  transition: all 0.3s;
}
.modal-content .box:hover {
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.modal-content i {
  display: block;
  margin-bottom: 0.5rem;
}
.modal-content span {
  font-size: 1.1rem;  
}
.thumbnail {
  width: 100%;    
}
.thumbnail > img{
  max-width: 100%;
  max-height: 50vh;
}
.url {
  width: 100%;
  margin: 0.5rem 0;
}
.url > input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid gray;
  border-radius: 3px;
  outline: none;
  font-size: 1.1rem;
}
</style>