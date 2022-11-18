import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { searchModel } from "../model/searchModel";

const InputView = observer(() => {
  return (
    <input
      type="text"
      value={searchModel.keyword}
      onChange={action((e) => (searchModel.keyword = e.target.value))}
    />
  );
});

export default InputView;
