const sql = require("../config/vacCenterDB");

// Constructor
const vacCenter = function(vacCenter){
    this.id = vacCenter.id;
    this.name = vacCenter.name;
    this.tel = vacCenter.tel;
};

vacCenter.getAll = result => {
    sql.query("SELECT * FROM vacCenter", (err,res) => {
        if (err){
            console.log("error: ",err);
            result(null,err);
            return;
        }

        console.log("vacCenter: ", res);
        result(null,res);
    });
};

module.exports = vacCenter;