import { Label } from 'app/_models/label';
import { User } from 'app/_models/user';

export class Utilities {

    static labelforModelName (modelName: string) {
        let label = modelName.replace('.', ' ');
        const labels = <Label[]>JSON.parse(localStorage.getItem('labels'));
        if (labels) {
            const dbLabel = labels.find(l => l.modelName === modelName);
            if ( dbLabel ) {
                label = dbLabel.labelName;
            }
        }

        return label;
    }

    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          // tslint:disable-next-line: no-bitwise
          const r = Math.random() * 16 | 0;
          // tslint:disable-next-line: no-bitwise
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }


      static userIsSuperAdmin(): boolean {
        let isAdmin = false;
        const user = <User>JSON.parse(localStorage.getItem('user'));
        if (user.roles) {
            for (let i = 0; i < user.roles.length; i++ ) {
                if (user.roles[i].role.isSuperUser) {
                    isAdmin = true;
                }
            }
        }
        return isAdmin;
    }

    static userIsCompanyAdmin(): boolean {
        let isAdmin = false;
        const user = <User>JSON.parse(localStorage.getItem('user'));
        if (user.roles) {
            for (let i = 0; i < user.roles.length; i++ ) {
                if (user.roles[i].role.isCompanyAdmin) {
                    isAdmin = true;
                }
            }
        }
        return isAdmin;
    }

    static columnsFromConfig(componentModel: string, tableColumns: any[], companyConfig: string): any[] {
        let newTableColumns = tableColumns;
        const myCompanyConfig = <any[]>JSON.parse(companyConfig);
        if (myCompanyConfig) {
            const myComponentConfig = <any[]>myCompanyConfig.find(x => x.componentmodel === componentModel);
            if (myComponentConfig) {
                const myComponentConfigInner = myComponentConfig['componentconfig'];
                const myDataTable = myComponentConfigInner['datatable'];
                const myColumns = JSON.parse(myDataTable['columns']);
                let myDeleteModel = [];
                newTableColumns.forEach(element => {
                    const columnIndex = myColumns.findIndex(x => x.model === element.model);
                    if ( columnIndex < 0 || myColumns[columnIndex].visible === false){
                        myDeleteModel.push(element.model);
                    }; 
                });
                myDeleteModel.forEach(element => {
                    const columnIndex = newTableColumns.findIndex(x => x.model === element);
                    newTableColumns.splice(columnIndex, 1);
                });
                
                const compareIndex = function (col1: any, col2: any) {
                    const col1index = myColumns.findIndex(x => x.model === col1.model);
                    const col2index = myColumns.findIndex(x => x.model === col2.model);
                    return col1index < col2index ? -1 : 1;
                }
                newTableColumns = newTableColumns.sort(compareIndex);

            }
        }
        return newTableColumns;
    }

    static columnsForConfig(componentModel: string, dataTableRecords: any[], companyConfig: string): any[] {
        let newDataTableColumns = dataTableRecords;
        const myCompanyConfig = <any[]>JSON.parse(companyConfig);
        if (myCompanyConfig) {
            const myComponentConfig = <any[]>myCompanyConfig.find(x => x.componentmodel === componentModel);
            if (myComponentConfig) {
                const myComponentConfigInner = myComponentConfig['componentconfig'];
                const myDataTable = myComponentConfigInner['datatable'];
                const myColumns = JSON.parse(myDataTable['columns']);
                newDataTableColumns = [];
                myColumns.forEach(element => {
                    newDataTableColumns.push({id: element.id, model: element.model,
                                              name: Utilities.labelforModelName(element.model), visible: element.visible});
                });
            }
        }
        return newDataTableColumns;
    }

    static itemVisibleForConfig(componentModel: string, type: string, companyConfig: string): boolean {
        const myCompanyConfig = <any[]>JSON.parse(companyConfig);
        if (myCompanyConfig) {
            const myComponentConfig = <any[]>myCompanyConfig.find(x => x.componentmodel === componentModel);
            if (myComponentConfig) {
                const myComponentConfigInner = myComponentConfig['componentconfig'];
                const myItem = myComponentConfigInner[type];
                const myItemInner = myItem[type];
                return myItemInner.visible;
            }
        }
        return true;
    }

    static detectIE(){
        const ua = window.navigator.userAgent;

        const msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        const trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            const rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        const edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }

    static createCustomEventIE(eventname: string, detailstring: string) {
        function myCustomEvent ( event, detail ) {
          const params = { bubbles: false, cancelable: false, detail: detail };
          const evt = document.createEvent( 'CustomEvent' );
          evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
          return evt;
         }

        window.dispatchEvent(myCustomEvent(eventname, detailstring));
    }

}
