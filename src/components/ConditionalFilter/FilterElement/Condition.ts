/* eslint-disable @typescript-eslint/member-ordering */
import { InitialStateResponse } from "../API/InitialStateResponse";
import { LeftOperand } from "./../useLeftOperands";
import { UrlToken } from "./../ValueProvider/UrlToken";
import { ConditionOptions } from "./ConditionOptions";
import { ConditionSelected } from "./ConditionSelected";

export class Condition {
  private constructor(
    public options: ConditionOptions,
    public selected: ConditionSelected,
    public loading: boolean,
  ) {}

  public enableLoading() {
    this.loading = true;
  }

  public disableLoading() {
    this.loading = false;
  }

  public isLoading() {
    return this.loading;
  }

  public static createEmpty() {
    return new Condition(
      ConditionOptions.empty(),
      ConditionSelected.empty(),
      false,
    );
  }

  public static emptyFromLeftOperand(operand: LeftOperand) {
    const options = ConditionOptions.fromName(operand.type);

    return new Condition(
      options,
      ConditionSelected.fromConditionItem(options.first()),
      false,
    );
  }

  public static fromUrlToken(token: UrlToken, response: InitialStateResponse) {
    if (ConditionOptions.isStaticName(token.name)) {
      const staticOptions = ConditionOptions.fromStaticElementName(token.name);
      const selectedOption = staticOptions.findByLabel(token.conditionKind);
      const valueItems = response.filterByUrlToken(token);
      const value =
        selectedOption?.type === "multiselect" && valueItems.length > 0
          ? valueItems
          : valueItems[0];

      if (!selectedOption) {
        return Condition.createEmpty();
      }

      return new Condition(
        staticOptions,
        ConditionSelected.fromConditionItemAndValue(selectedOption, value),
        false,
      );
    }

    if (token.isAttribute()) {
      const attribute = response.attributeByName(token.name);
      const options = ConditionOptions.fromAtributeType(attribute.inputType);
      const value = response.filterByUrlToken(token);

      return new Condition(
        options,
        ConditionSelected.fromConditionItemAndValue(options.first(), value),
        false,
      );
    }

    return Condition.createEmpty();
  }
}
