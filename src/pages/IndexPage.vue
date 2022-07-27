<template>
  <q-page padding>
    <div>
      <q-table
        title="Treats"
        :rows="courses"
        :columns="columns"
        row-key="name"
        dark
        style="background-color: rgb(0, 0, 29); color: whitesmoke"
        :filter="filter"
        color="amber"
      >
        <template v-slot:top>
          <span class="text-h5">Cursos</span>
          <q-space />
          <q-btn
            class="add-btn"
            dark
            debounce="300"
            icon="add"
            rounded
            :to="{ name: 'formCourse' }"
          />

          <q-input
            dense
            dark
            debounce="300"
            color="white"
            filled
            v-model="filter"
            placeholder="Search"
            font-color="white"
          >
            <template v-slot:append>
              <q-icon name="search" color="white" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-sm">
            <q-btn icon="edit" @click="editCourse(props.row.id)" />
            <q-btn icon="delete" @click="deleteCourse(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import coursesService from "../services/courses.js";
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const courses = ref([]);
    const { list, del } = coursesService();

    const columns = [
      {
        name: "id",
        align: "center",
        label: "ID",
        field: "id",
        sortable: true,
      },
      {
        name: "name",
        align: "center",
        label: "Nome",
        field: "name",
        sortable: true,
      },
      {
        name: "description",
        label: "Descrição",
        align: "center",
        field: "description",
      },
      { name: "code", label: "Código", align: "center", field: "code" },
      { name: "actions", field: "actions", align: "center" },
    ];

    const $q = useQuasar();
    const route = useRouter();

    onMounted(() => {
      getCourses();
    });

    const getCourses = async () => {
      try {
        const response = await list();
        console.log(response);
        courses.value = response;
      } catch (error) {
        console.log(error);
      }
    };

    const deleteCourse = async (id) => {
      try {
        $q.dialog({
          dark: true,
          title: "Remover",
          message: "Deseja excluir o curso?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await del(id);
          await getCourses();
          $q.notify({
            message: "Deletado com suceso.",
            icon: "delete_sweep",
          });
        });
      } catch (error) {
        $q.notify({
          message: "Erro ao deletar.",
          icon: "error",
        });
        console.log(error);
      }
    };

    const editCourse = async (id) => {
      route.push({ name: "formCourse", params: { id } });
    };

    return {
      filter: ref(""),
      courses,
      columns,
      deleteCourse,
      editCourse,
    };
  },
});
</script>
<style>
.q-page {
  background: rgb(238, 174, 202);
  background: linear-gradient(
    0deg,
    rgba(238, 174, 202, 0.8) 0%,
    rgba(148, 187, 233, 1) 100%
  );
}
.add-btn {
  margin-right: 20px;
  background-color: rgb(45 45 45);
}
</style>
