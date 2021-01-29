export const adminLocalStorage={
    adminStatus:function(){
        return localStorage.getItem("admin-status")
    },
    token:function(){
        return localStorage.getItem("con-jwt");
    },
    propertyName:function(){
        return localStorage.getItem("property-name")
    },
    userId:function(){
        return localStorage.getItem("user-id")
    },
    propertyId:function(){
        return localStorage.getItem("property-id");
    }
}