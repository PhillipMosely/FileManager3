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
}
