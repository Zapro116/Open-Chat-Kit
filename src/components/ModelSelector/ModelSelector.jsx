import React, { useEffect, useState } from "react";
import { Loader, Select } from "@mantine/core";
import useModelStore from "../../store/modelStore";
import { useAuth } from "@clerk/clerk-react";
import { getModels } from "../../api/websiteApi";
import { DEFAULT_CLERK_TEMPLATE } from "../../utils/contants";

const ModelSelector = () => {
  const { selectedModel, setSelectedModel, models, setModels } =
    useModelStore();
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const fetchModels = async () => {
    // const backupModels = [
    //   { label: "gpt-4o", value: "gpt-4o" },
    //   { label: "gpt-3.5-turbo", value: "gpt-3.5-turbo" },
    //   { label: "claude-3-5-sonnet", value: "claude-3-5-sonnet" },
    // ];
    if (models.length > 0) {
      return;
    }
    try {
      setLoading(true);
      const token = await getToken({
        template: DEFAULT_CLERK_TEMPLATE,
      });

      const response = await getModels(token);

      const transformedModels = response.data?.data?.models
        ?.filter((model) => model.enabled)
        .map((model) => ({
          value: model?.slug,
          label: model?.name,
          accept_image: model?.accept_image,
        }));
      setModels(transformedModels ?? []);
      setSelectedModel(transformedModels[0]?.value ?? "");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  if (loading)
    return (
      <Loader type="dots" color="var(--pagination-tabs-bg-active-color)" />
    );

  return (
    <Select
      data={models}
      value={selectedModel}
      onChange={setSelectedModel}
      size="sm"
      className="rounded max-w-[180px] bg-bgCardColor"
      classNames={{
        input: "!bg-bgCardColor focus:!ring-0 focus:!border-borderDefault",
      }}
      checkIconPosition="right"
    />
  );
};

export default ModelSelector;
[]