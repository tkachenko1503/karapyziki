import Parse from "parseX";
import R from "ramda";

let _toJSON = R.map((item) => {
    return item.toJSON();
});

class BaseModel extends Parse.Object {
    constructor (name, attrs) {
        super(name);

        if (this.setAttrs && attrs) {
            this.setAttrs(attrs);
        }
    }

    static toJSON (items) {
        return _toJSON(items);
    }

    static getById (id) {
        let query = new Parse.Query(this);
        return query.get(id);
    }
}

BaseModel.getFile = R.invoker(1, "fromJSON")(R.__, Parse.File);

export default BaseModel;
