import { SumaryCreateParams } from "../../types";
import { PARAMS } from "@/constants/model";
import { CustomInput } from "../utils/custominputs";
import { RegisterOptions, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
const SummaryParamsSelector = ({
  handleClose,
  handleCreateResume,
  bookId,
}: {
  handleClose: () => void;
  handleCreateResume: (creationParams: SumaryCreateParams) => void;
  bookId: number;
}) => {
  const paramsFormHook = useForm<SumaryCreateParams>({
    defaultValues: PARAMS?.reduce((acc: any, param) => {
      acc[param.name as keyof SumaryCreateParams] = param.defaultValue;
      return acc;
    }, {}),
  });

  const [currentCost, setCurrentCost] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { user} = useContext(UserContext);

  const {
    handleSubmit,
    register,
    clearErrors,
    formState: { errors },
  } = paramsFormHook;

  const onSubmit = (data: SumaryCreateParams) => {
    handleCreateResume(data);
  };

  useEffect(() => {
    calculateCost(paramsFormHook.getValues());
  }, []);

  const commonReactHookFormProps = (
    name: keyof SumaryCreateParams
  ):
    | RegisterOptions<SumaryCreateParams, keyof SumaryCreateParams>
    | undefined => {
    return {
      required: "Este campo es requerido",
      onChange: () => {
        errors[name] ?? clearErrors(name);

        if (
          PARAMS.filter((param) => param.costeable)
            .map((param) => param.name)
            .includes(name)
        ) {
          calculateCost(paramsFormHook.getValues());
        }
      },
    };
  };

  const calculateCost = (data: SumaryCreateParams) => {
    if (loading) return;
    setLoading(true);
    fetch("/api/summaries/cost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        bookId,
      }),
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          console.log(res.status, res.statusText);
        }
      })
      .then((dataJson) => {
        if (!dataJson) return console.log("No data");
        setCurrentCost(dataJson);
      })
      .finally(() => setLoading(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 bg-white h-fit rounded-lg p-2 w-full"
    >
      
      <div className="text-2xl font-bold">Create a new summary</div>
      <span className="text-gray-500 text-center italic">
          You will pay:
        </span>
        
      <span className="text-gray-500 text-center italic text-red-400">
        {loading ? "Loading cost..." : currentCost}
      </span>
      <div className="mb-2 text-center">
        <span className="text-gray-500 text-center italic">
          Available tokens:
        </span>
      </div>

      <span className="text-gray-500 text-center italic ">
        {user && user.available_tokens.toLocaleString()}
      </span>
      
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

      <div className="flex gap-2">
        

        <button
          type="submit"
          className={`${
            user && user.available_tokens - parseFloat(currentCost) >= 0
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-blue-200 hover:bg-blue-200"
          } text-white font-bold py-1 px-4 rounded-2xl w-fit`}
          disabled={user && user.available_tokens - parseFloat(currentCost) < 0}
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

export default SummaryParamsSelector;
