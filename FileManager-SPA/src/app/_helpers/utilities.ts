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
        debugger;
        let newTableColumns = tableColumns;
        const myCompanyConfig = <any[]>JSON.parse(companyConfig);
        if (myCompanyConfig) {
            const myComponentConfig = <any[]>myCompanyConfig.find(x => x.componentmodel === componentModel);
            if (myComponentConfig) {
                const myComponentConfigInner = myComponentConfig['componentconfig'];
                const myDataTable = myComponentConfigInner['datatable'];
                const myColumns = JSON.parse(myDataTable['columns']);
                newTableColumns = [];
                myColumns.forEach(element => {
                    const oldColumn = tableColumns.find(x => x.model === element.model);
                    newTableColumns.push(oldColumn);
                });

            }
        }
        return newTableColumns;
    }
}
