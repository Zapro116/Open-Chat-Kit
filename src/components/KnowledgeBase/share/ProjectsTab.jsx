import React from "react";
// import { Text, Loader, Checkbox, Badge } from "@mantine/core";
// import { IconSearch } from "@tabler/icons-react";

/**
 * ProjectsTab component for displaying and selecting projects to share a knowledge base with
 * @param {Object} props - Component props
 * @param {Array} props.projects - List of projects
 * @param {Array} props.initialSelectedProjects - List of initially selected project IDs
 * @param {boolean} props.projectsLoading - Whether projects are loading
 * @param {boolean} props.sharedProjectsLoading - Whether shared projects are loading
 * @param {string} props.projectsError - Error message if projects failed to load
 * @param {string} props.projectSearchQuery - Search query for filtering projects
 * @param {Function} props.setProjectSearchQuery - Function to update the search query
 * @param {Function} props.toggleProjectSelection - Function to toggle project selection
 */
const ProjectsTab = ({
  projects,
  finalShareList,
  projectsLoading,
  projectsError,
  projectSearchQuery,
  setProjectSearchQuery,
  toggleProjectSelection,
}) => {
  // Filter projects based on search query
  const filteredProjects = projects.filter((project) =>
    project && project.team_name
      ? project.team_name
          .toLowerCase()
          .includes(projectSearchQuery.toLowerCase())
      : false
  );

  return (
    <div className="pt-4">
      {/* Search input for projects */}
      <div className="flex items-center gap-2 w-full bg-bgCardColor py-2 px-3 rounded-md border border-borderDefault mb-4">
        {/* <IconSearch size={16} className="text-textDimmedColor" /> */}
        <span className="text-textDimmedColor">🔍</span>
        <input
          type="text"
          value={projectSearchQuery}
          placeholder="Search projects"
          className="w-full text-textDefault focus:outline-none focus:border-textPurple bg-transparent"
          onChange={(e) => {
            setProjectSearchQuery(e.target.value);
            // No need to fetch again, just filter the existing projects
          }}
        />
      </div>

      {/* Projects list */}
      <div className="max-h-60 overflow-y-auto custom-scrollbar">
        {projectsLoading ? (
          <div className="flex flex-col items-center justify-center h-32">
            {/* <Loader size="sm" color="var(--text-purple-color)" /> */}
            {/* <Text size="xs" className="mt-2 text-textDimmedColor"> */}
            <p className="mt-2 text-textDimmedColor text-xs">
              Loading projects...
            </p>
            {/* </Text> */}
          </div>
        ) : projectsError ? (
          // <Text size="sm" className="text-center py-4 text-textDangerColor">
          <p className="text-center py-4 text-textDangerColor text-sm">
            {projectsError}
          </p>
        ) : // </Text>
        filteredProjects.length === 0 ? (
          // <Text size="sm" className="text-center py-4 text-textDimmedColor">
          <p className="text-center py-4 text-textDimmedColor text-sm">
            No projects found
          </p>
        ) : (
          // </Text>
          <div className="flex flex-col gap-2">
            {filteredProjects.map((project) => (
              <div
                key={project.team_id}
                className="flex items-center p-2 hover:bg-bgSelectedColor rounded-md cursor-pointer transition-colors duration-200"
                onClick={() => toggleProjectSelection(project)}
              >
                {/* <Checkbox
                  checked={finalShareList.team_id?.some(id => id === project.team_id) || false}
                  className="mr-2"
                  color="var(--background-primary)"
                  styles={{
                    input: {
                      cursor: "pointer",
                      "&:checked": {
                        backgroundColor: "var(--text-purple-color)",
                        borderColor: "var(--text-purple-color)",
                      },
                    },
                    icon: { color: "white" },
                  }}
                  readOnly
                /> */}
                <input
                  type="checkbox"
                  checked={
                    finalShareList.team_id?.some(
                      (id) => id === project.team_id
                    ) || false
                  }
                  className="mr-2 cursor-pointer accent-text-purple-color"
                  readOnly
                />
                <div className="flex flex-col flex-grow">
                  {/* <Text size="sm" className="text-textDefault font-medium"> */}
                  <p className="text-textDefault font-medium text-sm">
                    {project.team_name}
                  </p>
                  {/* </Text> */}
                  {project.description && (
                    // <Text size="xs" className="text-textDimmedColor">
                    <p className="text-textDimmedColor text-xs">
                      {project.description}
                    </p>
                    // </Text>
                  )}
                </div>
                {project?.has_access && (
                  // <Badge
                  //   size="xs"
                  //   className="ml-auto bg-textPurple text-white"
                  //   variant="filled"
                  // >
                  <span className="ml-auto bg-textPurple text-white text-xs px-2 py-1 rounded-full">
                    Shared
                  </span>
                  // </Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsTab;
