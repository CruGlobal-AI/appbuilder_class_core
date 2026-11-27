import ABMobileView from "../../platform/mobile/ABMobileView";

const ABViewGridPropertyComponentDefaults = {
   dataviewID: null,
   columns: [], // {array} field ids to show, in order
   height: 0,
   hideTitle: 0,
   hideTabs: 0,
   linkPageAdd: "",
   linkPageDetail: "",
};

const ABViewDefaults = {
   key: "mobile-grid", // {string} unique key for this view
   icon: "table", // {string} fa-[icon] reference for this view
   labelKey: "Grid", // {string} the multilingual label key for the class label
};

export default class ABMobileViewGridCore extends ABMobileView {
   constructor(values, application, parent, defaultValues) {
      super(values, application, parent, defaultValues || ABViewDefaults);
   }

   static common() {
      return ABViewDefaults;
   }

   static defaultValues() {
      return ABViewGridPropertyComponentDefaults;
   }

   /**
    * @method componentList
    * return the list of components available on this view to display in the editor.
    */
   componentList() {
      return [];
   }

   /**
    * @method fields()
    * return the ABFields to show as columns, in the order they were picked.
    * Unknown field ids are skipped.
    * @return {array} [{ABField}]
    */
   fields() {
      const object = this.datacollection?.datasource;
      if (!object) return [];

      return (this.settings.columns || [])
         .map((id) => object.fieldByID(id))
         .filter((f) => f);
   }

   /**
    * @method wantsAdd()
    * Some widgets can indicate to their containing ABMobilePage that
    * it wants to provide an [Add] feature.
    * @return {bool}
    */
   get wantsAdd() {
      return !!this.settings.linkPageAdd;
   }
}
