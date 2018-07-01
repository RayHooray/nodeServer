const path = '/api';

module.exports = {
    // user
    userLogin: path + '/user/login',
    userLogout: path + '/user/logout',
    userList: path + '/user/list',
    userDelete: path + '/user/delete',
    userAdd: path + '/user/add',
    userDeleteMulti: path + '/user/delete-multi',
    userChangeRole: path + '/user/change-role',

    // hospital
    hospitalList: path + '/hospital/list',
    hospitalDetail: path + '/hospital/detail',
    hospitalDelete: path + '/hospital/delete',
    hospitalAdd: path + '/hospital/add',
    hospitalDeleteMulti: path + '/hospital/delete-multi',
};
