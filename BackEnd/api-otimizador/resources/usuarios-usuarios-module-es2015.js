(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["usuarios-usuarios-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/usuarios/usuarios-form/usuarios-form.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/usuarios/usuarios-form/usuarios-form.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h3 class=\"text-center\">Edição de usuário</h3>\n\n<form [formGroup]=\"formulario\" class=\"needs-validation\">\n  <div class=\"form-row\">\n    <div class=\"col-md-4 mb-3\">\n      <label for=\"nome\">Nome Completo</label>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        id=\"nome\"\n        placeholder=\"Nome completo\"\n        formControlName=\"nome\"\n      />\n    </div>\n    <div class=\"col-md-4 mb-3\">\n      <label for=\"login\">Login</label>\n      <input type=\"text\" class=\"form-control\" id=\"login\" placeholder=\"Login\" formControlName=\"login\" />\n    </div>\n    <div class=\"col-md-4 mb-3\">\n      <label for=\"senha\">Senha</label>\n      <input\n        type=\"password\"\n        class=\"form-control\"\n        id=\"senha\"\n        placeholder=\"****\"\n        formControlName=\"senha\"\n      />\n    </div>\n  </div>\n  <div class=\"form-row\">\n    <div class=\"col-md-4 mb-3\">\n      <label for=\"ativo\">Ativo</label>\n      <div id=\"ativo\">\n        <div class=\"custom-control custom-radio custom-control-inline\">\n          <input\n            type=\"radio\"\n            id=\"sim\"\n            name=\"ativo\"\n            class=\"custom-control-input\"\n            formControlName=\"ativo\"\n            value=\"Sim\"\n            [checked]=\"usuario.ativo == 'Sim'\"\n          />\n          <label class=\"custom-control-label\" for=\"sim\">Sim</label>\n        </div>\n        <div class=\"custom-control custom-radio custom-control-inline\">\n          <input\n            type=\"radio\"\n            id=\"nao\"\n            name=\"ativo\"\n            class=\"custom-control-input\"\n            formControlName=\"ativo\"\n            value=\"Nao\"\n            [checked]=\"usuario.ativo == 'Nao'\"\n          />\n          <label class=\"custom-control-label\" for=\"nao\">Não</label>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-4 mb-3\">\n      <label for=\"tipo-usuario\">Tipo Usuário</label>\n      <select class=\"custom-select custom-select-sm\" name=\"tipo-usuario\" id=\"tipo-usuario\" formControlName=\"tipo\">\n        <option selected>Selecione o tipo do usuário</option>\n        <option *ngFor=\"let t of tiposUsuarios\" value=\"{{ t }}\"> {{ t }} </option>\n      </select>\n    </div>\n  </div>\n  <button class=\"btn btn-primary\" type=\"submit\" (click)=\"gravarForm(this.formulario.value)\" >Gravar</button>\n  <button class=\"btn btn-danger\" type=\"button\" (click)=\"cancelarForm()\">Cancelar</button>\n</form>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/usuarios/usuarios-list/usuarios-list.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/usuarios/usuarios-list/usuarios-list.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\n\n  <button class=\"btn btn-success\" (click)=\"onNew()\">Novo</button>\n  <h3 class=\"text-center\">Usuários</h3>\n\n  <table class=\"table table-hover table-striped\">\n    <thead>\n      <tr>\n        <th scope=\"col\">#</th>\n        <th scope=\"col\">Nome</th>\n        <th scope=\"col\">Login</th>\n        <th scope=\"col\">Tipo</th>\n        <th scope=\"col\">Ativo</th>\n        <th scope=\"col\"></th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let u of usuarios\" >\n        <th scope=\"row\">{{ u.id }}</th>\n        <td>{{ u.nome }}</td>\n        <td>{{ u.login }}</td>\n        <td>{{ u.tipo }}</td>\n        <td>{{ u.ativo}}</td>\n        <td>\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"onEdit(u.id)\">Editar</button>\n          <button type=\"button\" class=\"btn btn-danger\" (click)=\"onDelete(u.id)\">Excluir</button>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n");

/***/ }),

/***/ "./src/app/enums/status.ts":
/*!*********************************!*\
  !*** ./src/app/enums/status.ts ***!
  \*********************************/
/*! exports provided: Status */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Status", function() { return Status; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var Status;
(function (Status) {
    Status["ATIVO"] = "Sim";
    Status["INATIVO"] = "Nao";
})(Status || (Status = {}));


/***/ }),

/***/ "./src/app/enums/tipoFuncionario.ts":
/*!******************************************!*\
  !*** ./src/app/enums/tipoFuncionario.ts ***!
  \******************************************/
/*! exports provided: TipoFuncionario */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoFuncionario", function() { return TipoFuncionario; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var TipoFuncionario;
(function (TipoFuncionario) {
    TipoFuncionario["FUNC"] = "Funcionario";
    TipoFuncionario["GERENTE"] = "Gerente";
})(TipoFuncionario || (TipoFuncionario = {}));


/***/ }),

/***/ "./src/app/usuarios/usuarios-form/usuarios-form.component.css":
/*!********************************************************************!*\
  !*** ./src/app/usuarios/usuarios-form/usuarios-form.component.css ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzdWFyaW9zL3VzdWFyaW9zLWZvcm0vdXN1YXJpb3MtZm9ybS5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/usuarios/usuarios-form/usuarios-form.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/usuarios/usuarios-form/usuarios-form.component.ts ***!
  \*******************************************************************/
/*! exports provided: UsuariosFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuariosFormComponent", function() { return UsuariosFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _usuarios_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../usuarios.service */ "./src/app/usuarios/usuarios.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");





let UsuariosFormComponent = class UsuariosFormComponent {
    constructor(service, fb, route, router) {
        this.service = service;
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.isEditable = false;
    }
    ngOnInit() {
        // Recebe uma lista dos tipos de usuários (Enums) no formato de Array
        this.tiposUsuarios = this.service.listTiposUsuarios();
        // Cria os controles do formulário Reativo
        this.usuario = { id: null, nome: null, login: null, senha: null, tipo: null, ativo: null };
        this.formulario = this.fb.group({
            nome: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(255)]],
            login: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(8)]],
            senha: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(255)]],
            ativo: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            tipo: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]]
        });
        // Se for edição preenche os campos com os dados do usuário
        const url = this.router.url;
        // console.log(url.indexOf('novo'));
        if (url.indexOf('novo') === -1) {
            // Recebe id do usuário pela URL e já transforma em número
            this.usuarioUrl = parseInt(this.route.snapshot.params.id, 10);
            // Busca no serviço o usuário pelo id
            this.service.listById(this.usuarioUrl).subscribe(usu => {
                this.usuario = usu;
                this.preencherCampos();
                // Se não encontrar usuário, retorna para a lista de usuário
                if (!this.usuario) {
                    this.router.navigate(['usuarios']);
                }
                else {
                    // this.usuario = {id: null, nome: null, login: null, senha: null, tipo: null, ativo: Status.ATIVO};
                }
            });
        }
    }
    //  Função de preencher os campos do formulário
    preencherCampos() {
        this.formulario.get('login').setValue(this.usuario.login);
        this.formulario.get('nome').setValue(this.usuario.nome);
        this.formulario.get('ativo').setValue(this.usuario.ativo);
        this.formulario.get('tipo').setValue(this.usuario.tipo);
    }
    gravarForm(usuario) {
        this.service.gravarUsuario(usuario).subscribe(res => console.log(res));
        this.router.navigate(['usuarios']);
    }
    cancelarForm() {
        this.router.navigate(['usuarios']);
    }
};
UsuariosFormComponent.ctorParameters = () => [
    { type: _usuarios_service__WEBPACK_IMPORTED_MODULE_1__["UsuariosService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
UsuariosFormComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-usuarios-form',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./usuarios-form.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/usuarios/usuarios-form/usuarios-form.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./usuarios-form.component.css */ "./src/app/usuarios/usuarios-form/usuarios-form.component.css")).default]
    })
], UsuariosFormComponent);



/***/ }),

/***/ "./src/app/usuarios/usuarios-list/usuarios-list.component.css":
/*!********************************************************************!*\
  !*** ./src/app/usuarios/usuarios-list/usuarios-list.component.css ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzdWFyaW9zL3VzdWFyaW9zLWxpc3QvdXN1YXJpb3MtbGlzdC5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/usuarios/usuarios-list/usuarios-list.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/usuarios/usuarios-list/usuarios-list.component.ts ***!
  \*******************************************************************/
/*! exports provided: UsuariosListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuariosListComponent", function() { return UsuariosListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _usuarios_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../usuarios.service */ "./src/app/usuarios/usuarios.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");




let UsuariosListComponent = class UsuariosListComponent {
    constructor(service, router, route) {
        this.service = service;
        this.router = router;
        this.route = route;
    }
    ngOnInit() {
        // Recebe uma lista de usuários
        // this.usuarios = this.service.list();
        this.service.list().subscribe(dados => this.usuarios = dados);
    }
    // Funcão redirecionará o usuário para a tela de edição de usuário
    onEdit(id) {
        if (id != null) {
            this.router.navigate(['usuarios/' + id]);
        }
    }
    onDelete(id) {
        if (id != null) {
            this.service.deleteUsuario(id);
        }
    }
    onNew() {
        this.router.navigate(['usuarios/novo']);
    }
};
UsuariosListComponent.ctorParameters = () => [
    { type: _usuarios_service__WEBPACK_IMPORTED_MODULE_1__["UsuariosService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
];
UsuariosListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-usuarios-list',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./usuarios-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/usuarios/usuarios-list/usuarios-list.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./usuarios-list.component.css */ "./src/app/usuarios/usuarios-list/usuarios-list.component.css")).default]
    })
], UsuariosListComponent);



/***/ }),

/***/ "./src/app/usuarios/usuarios-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/usuarios/usuarios-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: UsuariosRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuariosRoutingModule", function() { return UsuariosRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _usuarios_form_usuarios_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./usuarios-form/usuarios-form.component */ "./src/app/usuarios/usuarios-form/usuarios-form.component.ts");
/* harmony import */ var _usuarios_list_usuarios_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./usuarios-list/usuarios-list.component */ "./src/app/usuarios/usuarios-list/usuarios-list.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");





const routes = [
    { path: '', component: _usuarios_list_usuarios_list_component__WEBPACK_IMPORTED_MODULE_2__["UsuariosListComponent"] },
    { path: 'novo', component: _usuarios_form_usuarios_form_component__WEBPACK_IMPORTED_MODULE_1__["UsuariosFormComponent"] },
    { path: ':id', component: _usuarios_form_usuarios_form_component__WEBPACK_IMPORTED_MODULE_1__["UsuariosFormComponent"] },
    { path: ':id/editar', component: _usuarios_form_usuarios_form_component__WEBPACK_IMPORTED_MODULE_1__["UsuariosFormComponent"] }
];
let UsuariosRoutingModule = class UsuariosRoutingModule {
};
UsuariosRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]]
    })
], UsuariosRoutingModule);



/***/ }),

/***/ "./src/app/usuarios/usuarios.module.ts":
/*!*********************************************!*\
  !*** ./src/app/usuarios/usuarios.module.ts ***!
  \*********************************************/
/*! exports provided: UsuariosModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuariosModule", function() { return UsuariosModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _usuarios_list_usuarios_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./usuarios-list/usuarios-list.component */ "./src/app/usuarios/usuarios-list/usuarios-list.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _usuarios_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./usuarios-routing.module */ "./src/app/usuarios/usuarios-routing.module.ts");
/* harmony import */ var _usuarios_form_usuarios_form_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./usuarios-form/usuarios-form.component */ "./src/app/usuarios/usuarios-form/usuarios-form.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");








let UsuariosModule = class UsuariosModule {
};
UsuariosModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        declarations: [
            _usuarios_list_usuarios_list_component__WEBPACK_IMPORTED_MODULE_2__["UsuariosListComponent"],
            _usuarios_form_usuarios_form_component__WEBPACK_IMPORTED_MODULE_6__["UsuariosFormComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _usuarios_routing_module__WEBPACK_IMPORTED_MODULE_5__["UsuariosRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"].withConfig({ warnOnNgModelWithFormControl: 'never' })
        ]
    })
], UsuariosModule);



/***/ }),

/***/ "./src/app/usuarios/usuarios.service.ts":
/*!**********************************************!*\
  !*** ./src/app/usuarios/usuarios.service.ts ***!
  \**********************************************/
/*! exports provided: UsuariosService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuariosService", function() { return UsuariosService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _enums_tipoFuncionario__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../enums/tipoFuncionario */ "./src/app/enums/tipoFuncionario.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _enums_status__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../enums/status */ "./src/app/enums/status.ts");





let UsuariosService = class UsuariosService {
    constructor(http) {
        this.http = http;
        this.url = 'http://localhost:8000/api/usuarios';
        this.usuario = [
            { id: 1, nome: 'Josias Fonseca 1', login: 'Josias1', senha: '1234', tipo: _enums_tipoFuncionario__WEBPACK_IMPORTED_MODULE_1__["TipoFuncionario"].FUNC, ativo: _enums_status__WEBPACK_IMPORTED_MODULE_4__["Status"].ATIVO },
            { id: 2, nome: 'Josias Fonseca 2', login: 'Josias2', senha: '1234', tipo: _enums_tipoFuncionario__WEBPACK_IMPORTED_MODULE_1__["TipoFuncionario"].GERENTE, ativo: _enums_status__WEBPACK_IMPORTED_MODULE_4__["Status"].INATIVO },
            { id: 3, nome: 'Josias Fonseca 3', login: 'Josias3', senha: '1234', tipo: _enums_tipoFuncionario__WEBPACK_IMPORTED_MODULE_1__["TipoFuncionario"].FUNC, ativo: _enums_status__WEBPACK_IMPORTED_MODULE_4__["Status"].ATIVO },
            { id: 4, nome: 'Josias Fonseca 4', login: 'Josias4', senha: '1234', tipo: _enums_tipoFuncionario__WEBPACK_IMPORTED_MODULE_1__["TipoFuncionario"].GERENTE, ativo: _enums_status__WEBPACK_IMPORTED_MODULE_4__["Status"].ATIVO },
            { id: 5, nome: 'Josias Fonseca 5', login: 'Josias5', senha: '1234', tipo: _enums_tipoFuncionario__WEBPACK_IMPORTED_MODULE_1__["TipoFuncionario"].FUNC, ativo: _enums_status__WEBPACK_IMPORTED_MODULE_4__["Status"].INATIVO },
            { id: 6, nome: 'Josias Fonseca 6', login: 'Josias6', senha: '1234', tipo: _enums_tipoFuncionario__WEBPACK_IMPORTED_MODULE_1__["TipoFuncionario"].GERENTE, ativo: _enums_status__WEBPACK_IMPORTED_MODULE_4__["Status"].ATIVO },
            { id: 7, nome: 'Josias Fonseca 7', login: 'Josias7', senha: '1234', tipo: _enums_tipoFuncionario__WEBPACK_IMPORTED_MODULE_1__["TipoFuncionario"].FUNC, ativo: _enums_status__WEBPACK_IMPORTED_MODULE_4__["Status"].INATIVO },
            { id: 8, nome: 'Josias Fonseca 8', login: 'Josias8', senha: '1234', tipo: _enums_tipoFuncionario__WEBPACK_IMPORTED_MODULE_1__["TipoFuncionario"].GERENTE, ativo: _enums_status__WEBPACK_IMPORTED_MODULE_4__["Status"].ATIVO },
            { id: 9, nome: 'Josias Fonseca 9', login: 'Josias9', senha: '1234', tipo: _enums_tipoFuncionario__WEBPACK_IMPORTED_MODULE_1__["TipoFuncionario"].FUNC, ativo: _enums_status__WEBPACK_IMPORTED_MODULE_4__["Status"].INATIVO },
            { id: 10, nome: 'Josias Fonseca 10', login: 'Josias10', senha: '1234', tipo: _enums_tipoFuncionario__WEBPACK_IMPORTED_MODULE_1__["TipoFuncionario"].GERENTE, ativo: _enums_status__WEBPACK_IMPORTED_MODULE_4__["Status"].ATIVO }
        ];
    }
    lista() {
        return this.usuario;
    }
    list() {
        return this.http.get(this.url);
    }
    listById(id) {
        return this.http.get(`${this.url}/${id}`);
    }
    listTiposUsuarios() {
        const dados = Object.values(_enums_tipoFuncionario__WEBPACK_IMPORTED_MODULE_1__["TipoFuncionario"]);
        return dados;
    }
    deleteUsuario(id) {
        return this.http.delete(`${this.url}/${id}`).subscribe(res => console.log(res));
    }
    gravarUsuario(usuario) {
        console.log(usuario);
        return this.http.post(this.url, usuario);
    }
};
UsuariosService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
UsuariosService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
    })
], UsuariosService);



/***/ })

}]);