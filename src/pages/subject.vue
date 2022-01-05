<template>
  <div class="q-pa-md">
    <q-markup-table>
      <thead>
        <h5>Subject List</h5>
        <tr>
          <th class="text-left">SUBJECT ID</th>
          <th class="text-right">SUBJECT NAME</th>
          <th class="text-right">IS ACTIVE</th>
          <td class="text-right">
            <q-btn flat icon="add" color="negative" @click="AddSubjects" />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in this.myJson" :key="index">
          <td class="text-left">{{ data._id }}</td>
          <td class="text-right">{{ data.subjectname }}</td>
          <td class="text-right">{{ data.isactive }}</td>
          <td class="text-right">
            <q-btn
              flat
              icon="edit"
              color="negative"
              @click="editSubjects(data)"
            />
            <q-btn
              flat
              icon="delete"
              color="negative"
              @click="deleteSubjectdata(data)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-dialog v-model="editModal" @hide="cancelEdit">
      <q-card style="width: 700px; max-width: 80vw" v-if="userForm !== null">
        <q-card-section>
          <div class="text-h6">Subject Update :</div>
        </q-card-section>
        <br />
        <q-card-section class="q-pt-none">
          <q-input
            outlined
            v-model="userForm.subjectname"
            label="First Name "
            class="q-mb-md"
          />
          <br />
          <q-toggle v-model="userForm.isactive" label="Is active *" />

          <br />
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn
            label="Save"
            color="positive"
            @click="saveStudents"
            v-close-popup
          />
          <q-btn
            class="customButton"
            color="negative"
            label="Cancel"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addModal" @hide="handleCancel">
      <q-card style="width: 300px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Subject :</div>
        </q-card-section>
        <div class="q-pa-md" style="max-width: 400px">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              bottom-slots
              v-model="subjectname"
              label="Subject name "
              counter
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="style" />
              </template>

              <template v-slot:hint> Subject name </template>
            </q-input>

            <q-toggle
              v-model="isactive"
              label="I accept the license and terms"
            />

            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn
                label="Cancel"
                type="Cancel"
                color="primary"
                v-on:click="handleCancel"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteModal" @hide="cancelEdit"
      ><q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Would you really like to delete?</div>
          <br />
          <q-btn
            color="negative"
            label="Confirm"
            @click="confirmDeleteSubject"
            v-close-popup
          />
          <q-btn
            class="customButton"
            color="negative"
            label="Cancel"
            @click="cancelDeleteStudents"
            v-close-popup
          />
        </q-card-section> </q-card
    ></q-dialog>
  </div>
</template>
<script>
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { ref } from "vue";
export default {
  name: "SubjectName",
  emits: [],
  data() {
    return {
      stuid: [],
      brands: [],
      userForm: {
        _id: "",
        subjectname: "",
        isactive: "false",
      },
      deleteModal: false,
      myJson: [],
      editModal: false,
      addModal: false,
      editingIndex: null,
      newsdata: [],
    };
  },
  created() {
    this.$axios
      .get(["http://localhost:3000/register"])
      .then((response) => {
        response.data.forEach((element) => {
          this.brands.push(element.subjectname);
          this.stuid.push(element.isactive);
          console.log("brands" + this.brands);
        });
      })
      .catch((errors) => {
        console.log(errors);
      });
  },
  methods: {
    getSubjectdata() {
      this.$axios
        .get("http://localhost:3000/subject")
        .then((response) => {
          this.myJson = response.data;
        })
        .catch((error) => console.log("Error", error.message));
    },
    handleSubmit() {
      api
        .post("/register/subject", {
          subjectname: this.userForm.subjectname,
          isactive: this.userForm.isactive,
          student_id: this.userForm.student_id,
          studentname: this.userForm.studentname,
        })
        .then((response) => {
          this.$axios
            .get("http://localhost:3000/register")
            .then((response) => {
              this.myJson = response.data;
            })
            .catch((error) => console.log("Error", error.message));
        })
        .catch((error) => {
          console.log("Error", error.message);
        });
    },
    AddSubjects() {
      this.addModal = true;
    },
    handleCancel() {
      this.addModal = false;
      this.$axios
        .get("http://localhost:3000/register")
        .then((response) => {
          this.myJson = response.data;
        })
        .catch((error) => console.log("Error", error.message));
    },
    deleteSubjectdata(data) {
      this.userForm = JSON.parse(JSON.stringify(data));
      this.deleteModal = true;
    },
    cancelDeleteStudents() {
      this.deleteModal = false;
    },
    confirmDeleteSubject() {
      api
        .delete("/subject/" + this.userForm._id)
        .then((response) => {
          this.$axios
            .get("http://localhost:3000/subject")
            .then((response) => {
              this.myJson = response.data;
            })
            .catch((error) => console.log("Error", error.message));
        })
        .catch(() => {});
    },
    editSubjects(data) {
      this.userForm = JSON.parse(JSON.stringify(data));
      this.editModal = true;
    },
    cancelEdit() {
      this.editModal = false;
      this.userForm = null;
      this.editingIndex = null;
      this.$axios
        .get("http://localhost:3000/subject")
        .then((response) => {
          this.myJson = response.data;
        })
        .catch((error) => console.log("Error", error.message));
    },
    saveStudents() {
      api
        .patch("/subject/" + this.userForm._id, {
          subjectname: this.userForm.subjectname,
          isactive: this.userForm.isactive,
        })
        .then((response) => {
          this.$axios
            .get("http://localhost:3000/student")
            .then((response) => {
              this.myJson = response.data;
            })
            .catch((error) => console.log("Error", error.message));
        })
        .catch(() => {});
    },
  },
  setup() {
    const $q = useQuasar();
    const subjectname = ref(null);
    const isactive = ref(false);

    return {
      subjectname,
      isactive,
      async onSubmit() {
        await api
          .post("/register/subject", {
            subjectname: subjectname.value,
            isactive: isactive.value.toString(),
          })
          .then(() => {
            setTimeout(function () {
              location.reload(true);
            }, 1);
          })
          .catch((error) => console.log("Error", error.message));
      },
    };
  },
  mounted() {
    this.getSubjectdata();
  },
};
</script>
<style lang=""></style>
