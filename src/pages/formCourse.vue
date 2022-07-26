<template>
  <q-page>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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
            (val.length > 100 && val.length < 999) || 'Digite um código válido',
        ]"
      />
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "formCourse",
  setup() {
    const form = ref({
      name: "",
      description: "",
      code: "",
    });
    return {
      form,
    };
  },
});
</script>

<style></style>
