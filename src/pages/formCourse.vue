<template>
  <q-page>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        filled
        v-model="form.name"
        label="Nome"
        hint="Nome do curso"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Nome do curso é obrigatório',
        ]"
      />
      <q-input
        filled
        v-model="form.description"
        label="Descrição"
        hint="Descrição do curso"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Descrição do curso é obrigatória',
        ]"
      />
      <q-input
        filled
        type="number"
        v-model="form.code"
        label="Código"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Código é obrigatório',
          (val) =>
            (val >= 100 && val <= 999) || 'Digite um código válido',
        ]"
      />
      <div class="col-12 q-gutter-sm">
        <q-btn label="Salvar" style="background-color: rgba(0, 0, 46, 0.979); color: whitesmoke; margin-right: 20px" class="float-right" icon="save" type="submit"></q-btn>
        <q-btn label="Cancelar" style="background-color: red; color: whitesmoke;" class="float-right" icon="cancel" :to="{name: 'home'}"></q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import coursesService from 'src/services/courses'
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router"
export default defineComponent({
  name: "formCourse",
  setup() {
    const {list, post, getById, put} = coursesService()


    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();

    const form = ref({
      name: "",
      description: "",
      code: "",
      id: ""
    });

      onMounted(async()=>{
        if(route.params.id){
          getPost(route.params.id)
        }
      })

    const getPost = async (id) => {
      try {
        const response = await getById(id)
        form.value = response
      } catch (error) {
        console.error(error)
      }
    }

    const onSubmit = async () => {
      try {
        if(form.value.id){  //editando, e não criando
          await put(form.value)
        }
        else{
          const listing = await list()
          const id = listing[listing.length -1].id;
          form.value.id=id+1;
          await post(form.value)
        }
        $q.notify({
            message: "Salvo com suceso.",
            icon: "save_as",
          })
        router.push({name:'home'})
      } catch (error) {
        console.error(error)
      }
    }

    return {
      form,
      onSubmit
    };
  },
});
</script>

<style></style>
