import axiosClient from "../axiosClient";

const projectAPIs = {
  getAllUser: () => {
    return axiosClient.get("Users/getUser");
  },

  getSearchUser: (keyword) => {
    if (!keyword) {
      return axiosClient.get("Users/getUser");
    } else {
      return axiosClient.get("Users/getUser", {
        params: {
          keyword: keyword,
        },
      });
    }
  },
  getUserDetail: (id) => {
    const params = new URLSearchParams();
    params.append("id", id);
    return axiosClient.get("Project/getProjectDetail", {
      params,
    });
  },

  deleteUser: (id) => {
    const params = new URLSearchParams();
    params.append("id", id);
    return axiosClient.delete("Users/deleteUser", {
      params,
    });
  },
  updateUser: (UsertInfo) => {
    return axiosClient.put("Users/editUser", UsertInfo);
  },
};

export default projectAPIs;
