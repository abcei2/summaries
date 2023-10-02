import { SumaryCreateParams } from "../../types";
import { PARAMS } from "@/constants/model";
import { CustomInput } from "../utils/custominputs";
import { RegisterOptions, useForm } from "react-hook-form";
import { useState } from "react";

const DefaultSurveyParamsForm = () => {
  const paramsFormHook = useForm<SumaryCreateParams>({
    defaultValues: PARAMS?.reduce((acc: any, param) => {
      acc[param.name as keyof SumaryCreateParams] = param.defaultValue;
      return acc;
    }, {}),
  });
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    clearErrors,
    formState: { errors },
  } = paramsFormHook;

  const onSubmit = (data: SumaryCreateParams) => {};
  
  const commonReactHookFormProps = (
    name: keyof SumaryCreateParams
  ):
    | RegisterOptions<SumaryCreateParams, keyof SumaryCreateParams>
    | undefined => {
    return {
      required: "Este campo es requerido",
      onChange: () => {
        errors[name] ?? clearErrors(name);
      },
    };
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 bg-white h-fit rounded-lg p-4 w-[90%] md:w-[80%] border rounded-lg"
    >
      <div className="text-2xl font-bold">Default summary params</div>
      
      {PARAMS &&
        PARAMS.map((param, index) => (
          <CustomInput
            key={index}
            type={param.type}
            error={errors[param.name as keyof SumaryCreateParams]}
            selectOptions={param.values}
            label={param.name}
            reactFormHookProps={register(
              param.name as keyof SumaryCreateParams,
              {
                ...commonReactHookFormProps(
                  param.name as keyof SumaryCreateParams
                ),
              }
            )}
          />
        ))}

      <div className="flex gap-2 justify-center w-full ">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-lg w-[70%] "
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default DefaultSurveyParamsForm;
