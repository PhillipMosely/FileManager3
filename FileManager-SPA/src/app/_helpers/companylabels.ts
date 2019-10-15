import { Label } from 'app/_models/label';

class CompanyLabels {

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
}
