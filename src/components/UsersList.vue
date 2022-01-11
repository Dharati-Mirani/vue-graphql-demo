<template>
  <div>
    <!-- <div v-for="user in users" :key="user.user_id">{{ user.user_id }}</div> -->
    <div>
      <form v-if="!edit">
        <fieldset>
          <input type="text" placeholder="Name" v-model="name" />
          <input type="text" placeholder="Email" v-model="email" />
        </fieldset>
        <button type="submit" class="method-btn" @click="submit">Add</button>
      </form>
      <form v-else>
        <fieldset>
          <input type="text" placeholder="Name" v-model="editUser.name" />
          <input type="text" placeholder="Email" v-model="editUser.email" />
        </fieldset>
        <button type="submit" class="method-btn" @click="update">Update</button>
      </form>
    </div>
    <table>
      <thead>
        <tr>
          <th>User Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userList" :key="user.user_id">
          <td data-column="user_id">{{ user.user_id }}</td>
          <td data-column="name">{{ user.name }}</td>
          <td data-column="email">{{ user.email }}</td>
          <td data-column="delete">
            <button @click="editUserData(user)" class="action edit-btn">
              Edit
            </button>
            <button @click="deleteUser(user.user_id)" class="action delete-btn">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import gql from "graphql-tag";
// import { InMemoryCache } from "apollo-cache-inmemory";

export default {
  name: "UsersList",
  data() {
    return {
      name: "",
      email: "",
      editUser: {},
      edit: false,
    };
  },
  apollo: {
    userList: {
      query: gql`
        query getUsers {
          users {
            user_id
            name
            email
          }
        }
      `,
      update: (data) => {
        return data.users;
      },
    },
  },
  methods: {
    submit() {
      let name = this.name;
      let email = this.email;
      this.$apollo.mutate({
        mutation: gql`
          mutation addUser($name: String!, $email: String!) {
            insert_users(objects: [{ name: $name, email: $email }]) {
              returning {
                user_id
              }
            }
          }
        `,
        variables: {
          name,
          email,
        },
        refetchQueries: ["getUsers"],
      });
    },
    deleteUser(id) {
      let user_id = id;
      this.$apollo.mutate({
        mutation: gql`
          mutation deleteUser($user_id: Int) {
            delete_users(where: { user_id: { _eq: $user_id } }) {
              returning {
                user_id
              }
            }
          }
        `,
        variables: {
          user_id,
        },
        refetchQueries: ["getUsers"],
      });
    },
    editUserData(user) {
      this.edit = true;
      this.editUser = user;
    },
    update(e) {
      e.preventDefault();
      let name = this.editUser.name;
      let email = this.editUser.email;
      let user_id = this.editUser.user_id;
      this.$apollo.mutate({
        mutation: gql`
          mutation updateUsers($user_id: Int, $name: String!, $email: String!) {
            update_users(
              where: { user_id: { _eq: $user_id } }
              _set: { email: $email, name: $name }
            ) {
              returning {
                user_id
              }
            }
          }
        `,
        variables: {
          user_id,
          name,
          email,
        },
        refetchQueries: ["getUsers"],
      });
    },
  },
};
</script>
<style scoped>
table {
  width: 750px;
  border-collapse: collapse;
  margin: 50px auto;
}

/* Zebra striping */
tr:nth-of-type(odd) {
  background: #eee;
}

th {
  background: #3498db;
  color: white;
  font-weight: bold;
}

td,
th {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
  font-size: 18px;
}

/* 
Max width before this PARTICULAR table gets nasty
This query will take effect for any screen smaller than 760px
and also iPads specifically.
*/
@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  table {
    width: 100%;
  }

  /* Force table to not be like tables anymore */
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  /* Hide table headers (but not display: none;, for accessibility) */
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #ccc;
  }

  td {
    /* Behave  like a "row" */
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    /* Label the data */
    content: attr(data-column);

    color: #000;
    font-weight: bold;
  }
}
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  font-family: "Nunito", sans-serif;
  color: #384047;
}

form {
  max-width: 300px;
  margin: 10px auto;
  padding: 10px 20px;
  background: #f4f7f8;
  border-radius: 8px;
}

h1 {
  margin: 0 0 30px 0;
  text-align: center;
}

input[type="text"],
input[type="password"],
input[type="date"],
input[type="datetime"],
input[type="email"],
input[type="number"],
input[type="search"],
input[type="tel"],
input[type="time"],
input[type="url"],
textarea,
select {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  font-size: 16px;
  height: auto;
  margin: 0;
  outline: 0;
  padding: 15px;
  width: 100%;
  background-color: #e8eeef;
  color: #8a97a0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  margin-bottom: 30px;
}

input[type="radio"],
input[type="checkbox"] {
  margin: 0 4px 8px 0;
}

select {
  padding: 6px;
  height: 32px;
  border-radius: 2px;
}

.method-btn {
  padding: 19px 39px 18px 39px;
  color: #fff;
  background-color: #4bc970;
  font-size: 18px;
  text-align: center;
  font-style: normal;
  border-radius: 5px;
  width: 100%;
  border: 1px solid #3ac162;
  border-width: 1px 1px 3px;
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
  margin-bottom: 10px;
}

fieldset {
  margin-bottom: 30px;
  border: none;
}

legend {
  font-size: 1.4em;
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 8px;
}

label.light {
  font-weight: 300;
  display: inline;
}

.number {
  background-color: #5fcf80;
  color: #fff;
  height: 30px;
  width: 30px;
  display: inline-block;
  font-size: 0.8em;
  margin-right: 4px;
  line-height: 30px;
  text-align: center;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);
  border-radius: 100%;
}
.action {
  color: #fff;
  background-color: #4bc970;
  font-size: 18px;
  text-align: center;
  font-style: normal;
  border-radius: 5px;
  border: 1px solid #3ac162;
  border-width: 1px 1px 3px;
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
  margin-bottom: 10px;
  width: 50%;
}
.delete-btn {
  background-color: red;
  border: 1px solid red;
}
.edit-btn {
  background-color: blue;
  border: 1px solid blue;
}
@media screen and (min-width: 480px) {
  form {
    max-width: 480px;
  }
}
</style>