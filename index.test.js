(function () {
    require("./config/mongodb.test").runTests();
    require("./repository/repository.test").runTests();
    require("./server/server.test").runTests();
    require("./api/clientes.test").runTests();
})();
