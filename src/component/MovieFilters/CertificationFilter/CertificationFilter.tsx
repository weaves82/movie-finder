import React from "react";
import Checkbox from "../../UI/Form/Checkbox/Checkbox";
import { getCertifications } from "../../../helpers/helpersTs";

import {
  filterProps,
  filterArrayProps,
  certObject,
} from "../../filterForm.model";

const CertificationFilter = (props: filterProps) => {
  const [filters, setFilters] = React.useState<filterArrayProps[]>([]);
  const [checkBoxes, setCheckBoxes] = React.useState<certObject[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const certificates = await getCertifications();
      let certArray: filterArrayProps[] = [];
      certificates
        .filter((item: { certification: string }) => {
          return item.certification !== "A";
        })
        .sort((a: { order: number }, b: { order: number }) =>
          a.order > b.order ? 1 : -1
        )
        .map((item: { certification: string; order: number }) => {
          certArray.push({
            id: item.certification,
            label: item.certification,
            order: Number(item.order),
          });
          return certArray;
        });
      setFilters(certArray);
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    props.onChange({ certificates: checkBoxes });
  }, [checkBoxes]);

  React.useEffect(() => {
    props.isReset && setCheckBoxes([]);
  }, [props.isReset]);

  // const CheckBoxList = React.useMemo(() => {
  //   const onChangeHandler = () => (label: any, isClicked: boolean) => {
  //     isClicked
  //       ? checkBoxes.push(label)
  //       : checkBoxes.splice(checkBoxes.indexOf(label), 1);
  //     props.onChange({ certificate: checkBoxes });
  //   };

  //   return filters.map((item) => {
  //     return (
  //       <Checkbox
  //         key={item.id}
  //         onChange={onChangeHandler}
  //         label={item.label}
  //         id={item.id}
  //         isReset={props.isReset}
  //       />
  //     );
  //   });
  // }, [props]);

  // return <div>{CheckBoxList}</div>;

  const onChangeHandler = (
    id: any,
    isClicked: boolean,
    label: any,
    order?: number
  ) => {
    isClicked
      ? setCheckBoxes([...checkBoxes, { order, label, id }])
      : setCheckBoxes(checkBoxes.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h3>Certifications</h3>
      {filters.map((item) => {
        return (
          <Checkbox
            key={item.id}
            onChange={onChangeHandler}
            label={item.label}
            id={item.id}
            order={item.order}
            isReset={props.isReset}
          />
        );
      })}
    </div>
  );
};

export default CertificationFilter;
