import { SurveyCreateParams } from "../../types";
import { PARAMS } from "@/constants/model";
import { CustomInput } from "../utils/custominputs";
import { RegisterOptions, useForm } from "react-hook-form";

const SurveyParamsSelector = ({
  handleClose,
  handleCreateResume,
}: {
  handleClose: () => void;
  handleCreateResume: (creationParams: SurveyCreateParams) => void;
}) => {
  const paramsFormHook = useForm<SurveyCreateParams>({
    defaultValues: PARAMS?.reduce((acc:any, param) => {
      acc[param.name as keyof SurveyCreateParams] = param.defaultValue;
      return acc;
    }, {}),
  });

  const {
    handleSubmit,
    register,
    clearErrors,
    formState: { errors },
  } = paramsFormHook;

  const onSubmit = (data: SurveyCreateParams) => {
    handleCreateResume(data);
  };

  const commonReactHookFormProps = (
    name: keyof SurveyCreateParams
  ):
    | RegisterOptions<SurveyCreateParams, keyof SurveyCreateParams>
    | undefined => {
    switch (name) {
      case "temp":
        return {
          required: "Este campo es requerido",
          valueAsNumber: true,
          min: {
            value: 0,
            message: "El valor mínimo es 0",
          },
          max: {
            value: 1,
            message: "El valor máximo es 1",
          },
          onChange: () => {
            errors[name] ?? clearErrors(name);
          },
        };
      default:
        return {
          required: "Este campo es requerido",
          onChange: () => {
            errors[name] ?? clearErrors(name);
          },
        };
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 bg-white h-fit rounded-lg p-2 w-full"
    >
      <div className="text-2xl font-bold">Create a new summary</div>
      {PARAMS &&
        PARAMS.map((param, index) => (
          <CustomInput
            key={index}
            type={param.type}
            error={errors[param.name as keyof SurveyCreateParams]}
            selectOptions={param.values}
            label={param.name}
            reactFormHookProps={register(
              param.name as keyof SurveyCreateParams,
              {
                ...commonReactHookFormProps(
                  param.name as keyof SurveyCreateParams
                ),
              }
            )}
          />
        ))}

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-2xl w-fit "
        >
          Create
        </button>
        <button
          onClick={() => handleClose()}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded-2xl w-fit "
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SurveyParamsSelector;
