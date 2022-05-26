import { ModifierMapping } from "./ModifierMapping";

export class FoodicsProduct {

    public id : String;
    public sku : String;
    public barcode : String;
    public name: String;
    public name_localized : Object;
    public description: String;
    public description_localized : Object;
    public image: String;
    public is_active : boolean;
    public is_stock_product : boolean;
    public is_ready : boolean;
    public pricing_method : number;
    public selling_method: number;
    public costing_method: number;
    public preparation_time  : Object;
    public price: number;
    public cost  : Object;
    public calories: number;
    public created_at: String;
    public updated_at: String;
    public deleted_at  : Object;
    // public Category category;
    // public TaxGroup tax_group;
    // public ArrayList<Discount> discounts : Array<Discount>
    // public ArrayList<TimedEvent> timed_events;
    // public ArrayList<Tag> tags;
    // public ArrayList<Group> groups;
    // public ArrayList<Branch> branches;
    // public ArrayList<Modifier> modifiers;
    // public ArrayList<Ingredient> ingredients;

}
