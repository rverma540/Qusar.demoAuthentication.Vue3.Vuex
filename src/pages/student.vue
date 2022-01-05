/* eslint-disable vue/no-dupe-keys */
<template>
  <div class="q-pa-md">
    <q-markup-table>
      <thead>
        <h5>Student List</h5>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-right">FIRST NAME</th>
          <th class="text-right">Last Name</th>
          <th class="text-right">DOB</th>
          <th class="text-right">EMAIL ID</th>
          <th class="text-right">MOBILE</th>
          <th class="text-right">SUBJECT NAME</th>
          <td class="text-right">
            <q-btn flat icon="add" color="negative" @click="addStudent" />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in this.myJson" :key="index">
          <td class="text-left">{{ data._id }}</td>
          <td class="text-right">{{ data.firstname }}</td>
          <td class="text-right">{{ data.lastname }}</td>
          <td class="text-right">{{ data.dateofbirth }}</td>
          <td class="text-right">{{ data.email }}</td>
          <td class="text-right">{{ data.phone }}</td>
          <td class="text-right">
            {{ this.getSubjectlistbyid(data.subjectname) }}
          </td>
          <td class="text-right">
            <q-btn
              flat
              icon="edit"
              color="negative"
              @click="editStudents(data)"
            />
            <q-btn
              flat
              icon="delete"
              color="negative"
              @click="deleteStudents(data)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-dialog v-model="editModal" @hide="cancelEditStudents">
      <q-card style="width: 700px; max-width: 80vw" v-if="userForm !== null">
        <q-card-section>
          <div class="text-h6">Student :</div>
        </q-card-section>
        <br />
        <q-card-section class="q-pt-none">
          <q-input
            outlined
            v-model="userForm.firstname"
            label="First Name "
            class="q-mb-md"
          />
          <br />
          <q-input
            outlined
            v-model="userForm.lastname"
            label="Last Name "
            class="q-mb-md"
          />
          <br />
          <q-input
            outlined
            v-model="userForm.dateofbirth"
            label="Date of Birth"
            class="q-mb-md"
            type="String"
          />
          <br />
          <q-input
            outlined
            v-model="userForm.email"
            label="Email"
            class="q-mb-md"
            type="email"
          />
          <br />
          <q-input
            outlined
            v-model="userForm.phone"
            label="Phone"
            class="q-mb-md"
            type="number"
          />
          <br />
          <q-badge color="secondary" multi-line>
            SUBJECT NAMES {{ userForm.subjectname }}
          </q-badge>
          <q-select
            filled
            @update:model-value="showChannel()"
            v-model="userForm.subjectname"
            :options="brands"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please select subject',
            ]"
            option-value="_id"
            option-label="subjectname"
          />
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
      <q-card style="width: 300px; max-width: 80vw" v-if="userForm !== null">
        <q-card-section>
          <div class="text-h6">Student :</div>
        </q-card-section>
        <div class="q-pa-md" style="max-width: 300px">
          <form @submit.prevent.stop="onSubmit" class="q-gutter-md">
            <q-input
              ref="firstnameRef"
              filled
              type="firstname"
              v-model="firstname"
              id="firstname"
              name="firstname"
              label="First name *"
              hint="FIRST NAME"
              lazy-rules
              :rules="nameRules"
            />

            <q-input
              ref="lastnameRef"
              filled
              type="lastname"
              v-model="lastname"
              id="lastname"
              name="lastname"
              label="LAST NAME *"
              hint="LAST NAME"
              lazy-rules
              :rules="nameRules"
            />

            <q-input
              ref="dateofbirthRef"
              filled
              type="date"
              v-model="dateofbirth"
              id="dateofbirth"
              name="dateofbirth"
              hint="DOB"
              min="1950-01-01"
              max="2018-12-31"
              lazy-rules
              :rules="nameRules"
            />

            <q-input
              ref="emailRef"
              filled
              type="email"
              v-model="email"
              id="email"
              name="email"
              label="Email"
              hint="abcd@gmail.com"
              lazy-rules
              :rules="nameRules"
            />

            <q-input
              ref="phoneRef"
              filled
              type="number"
              v-model="phone"
              id="phone"
              name="phone"
              label="phone *"
              hint="6204411555"
              lazy-rules
              :rules="nameRules"
            />

            <q-input
              ref="passwordRef"
              filled
              type="password"
              v-model="password"
              id="password"
              name="password"
              label="password *"
              hint="password"
              lazy-rules
              :rules="nameRules"
            />

            <q-select
              filled
              @update:model-value="handleSelect()"
              v-model="subjectname"
              :options="brands"
              label="Student Name  *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please select subject',
              ]"
              option-value="_id"
              option-label="subjectname"
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
          </form>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteModal" @hide="cancelEditStudents"
      ><q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Would you really like to delete?</div>
          <br />
          <q-btn
            color="negative"
            label="Confirm"
            @click="confirmDeleteStudents"
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
  name: "StudentData",
  data() {
    return {
      brands: [],
      userForm: {
        _id: "",
        firstname: "",
        lastname: "",
        dateofbirth: "",
        email: "",
        phone: "",
        password: "",
        subject_id: "",
        subjectname: "",
      },
      deleteModal: false,
      myJson: [],
      editModal: false,
      addModal: false,
      editingIndex: null,
      subjectList: [],
      tempSname: "",
    };
  },
  created() {
    this.getOptionlistdata();
    this.getAllSubject();
  },
  methods: {
    showChannel() {
      alert("hey Dantani");
    },
    getAllSubject() {
      this.$axios.get(`http://localhost:3000/subject`).then((response) => {
        this.subjectList = response.data;
      });
    },
    getSubjectlistbyid(_id) {
      return this.subjectList.find((x) => x._id === _id)?.subjectname;
    },
    getAllformdata() {
      this.$axios
        .get("http://localhost:3000/register")
        .then((response) => {
          this.myJson = response.data;
        })
        .catch((error) => console.log("Error", error.message));
    },
    getOptionlistdata() {
      // debugger;
      this.$axios
        .get(["http://localhost:3000/subject"])
        .then((response) => {
          this.brands = response.data.filter((x) => x.isactive === true);
          console.log("----------------------1");
          console.log(this.brands);
          // this.brands.find((x)> x._id === _id)?.subjectname;
          console.log("----------------------2");
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    handleSelect() {},
    addStudent() {
      this.addModal = true;
    },
    handleCancel() {
      this.addModal = false;
      setTimeout(function () {
        location.reload(true);
      }, 10);
    },
    deleteStudents(data) {
      // debugger;
      this.userForm = JSON.parse(JSON.stringify(data));
      this.deleteModal = true;
    },
    cancelDeleteStudents() {
      // debugger;
      this.deleteModal = false;
    },
    confirmDeleteStudents() {
      //debugger;
      api
        .delete("/delete/" + this.userForm._id)
        .then((response) => {
          // debugger;
          his.$axios
            .get("http://localhost:3000/register")
            .then((response) => {
              this.myJson = response.data;
            })
            .catch((error) => console.log("Error", error.message));
        })
        .catch(() => {});
    },
    editStudents(data) {
      let temp = this.subjectList.find((x) => x._id === data.subjectname);
      // this.getSubjectlistbyid(data.subjectname);
      // alert(this.tempSname);
      this.userForm = JSON.parse(JSON.stringify(data));
      this.userForm.subjectname = temp;
      console.log("hey im getting this " + data);
      this.editModal = true;
    },
    cancelEditStudents() {
      this.editModal = false;
      this.userForm = null;
      this.editingIndex = null;
      this.$axios
        .get("http://localhost:3000/register")
        .then((response) => {
          this.myJson = response.data;
        })
        .catch((error) => console.log("Error", error.message));
    },
    saveStudents() {
      const subdata = {
        firstname: this.userForm.firstname,
        lastname: this.userForm.lastname,
        dateofbirth: this.userForm.dateofbirth,
        email: this.userForm.email,
        phone: this.userForm.phone,
        password: this.userForm.password,
        subjectname: this.userForm.subjectname,
      };

      // alert(subdata.subjectname,);
      api
        .patch("/register/" + this.userForm._id, subdata)
        .then((response) => {
          this.$axios
            .get("http://localhost:3000/register")
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
    const firstname = ref(null);
    const firstnameRef = ref(null);

    const lastname = ref(null);
    const lastnameRef = ref(null);

    const dateofbirth = ref(null);
    const dateofbirthRef = ref(null);

    const email = ref(null);
    const emailRef = ref(null);

    const phone = ref(null);
    const phoneRef = ref(null);

    const password = ref(null);
    const passwordRef = ref(null);

    const subject_id = ref(null);
    const subjectname = ref(null);

    return {
      subject_id,
      subjectname,
      firstname,
      firstnameRef,
      nameRules: [(val) => (val && val.length > 0) || "Please type something"],

      lastname,
      lastnameRef,
      // eslint-disable-next-line vue/no-dupe-keys
      nameRules: [(val) => (val && val.length > 0) || "Please type something"],

      dateofbirth,
      dateofbirthRef,
      // eslint-disable-next-line vue/no-dupe-keys
      nameRules: [(val) => (val && val.length > 0) || "Please type something"],

      email,
      emailRef,
      // eslint-disable-next-line vue/no-dupe-keys
      nameRules: [(val) => (val && val.length > 0) || "Please type something"],

      phone,
      phoneRef,
      // eslint-disable-next-line vue/no-dupe-keys
      nameRules: [(val) => (val && val.length > 0) || "Please type something"],

      password,
      passwordRef,
      // eslint-disable-next-line vue/no-dupe-keys
      nameRules: [(val) => (val && val.length > 0) || "Please type something"],

      options: ["B.TECH", "MCA", "BSC-IT", "BCA", "BSC"],
      dense: ref(false),
      denseOpts: ref(false),
      onSubmit() {
        firstnameRef.value.validate();
        lastnameRef.value.validate();
        dateofbirthRef.value.validate();
        emailRef.value.validate();
        phoneRef.value.validate();
        passwordRef.value.validate();

        if (
          firstnameRef.value.hasError ||
          lastnameRef.value.hasError ||
          dateofbirthRef.value.hasError ||
          emailRef.value.hasError ||
          phoneRef.value.hasError ||
          passwordRef.value.hasError
        ) {
          // form has error
        } else {
          const test = {
            firstname: this.firstname,
            lastname: this.lastname,
            dateofbirth: this.dateofbirth,
            email: this.email,
            phone: this.phone,
            password: this.password,
            subjectname: this.subjectname._id,
          };
          api
            .post("/register", test)
            .then((response) => {
              //debugger;
              setTimeout(function () {
                location.reload(true);
              }, 1);
            })
            .catch(() => {});
        }
      },
    };
  },
  mounted() {
    this.getAllformdata();
  },
};
</script>
<style>
.customButton {
  margin-left: 10px;
}
</style>
