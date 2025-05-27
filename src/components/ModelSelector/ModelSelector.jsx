import React, { useEffect, useState } from "react";
import { Loader, Select } from "@mantine/core";
import useModelStore from "../../store/modelStore";
import { useAuth } from "@clerk/clerk-react";
import { getModels } from "../../api/websiteApi";

const ModelSelector = () => {
  const { selectedModel, setSelectedModel } = useModelStore();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const fetchModels = async () => {
    try {
      setLoading(true);
      const token = await getToken({
        template: "neon2",
      });
      const response = await getModels(token);
      const transformedModels = response.data?.data?.models
        ?.filter((model) => model.enabled)
        .map((model) => ({
          value: model.slug,
          label: model.name,
          accept_image: model.accept_image,
        }));
      setModels(transformedModels);
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
