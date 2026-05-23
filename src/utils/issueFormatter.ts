const issueFormatter = (issue: any) => {
  const formattedData = {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,

    reporter: {
      id: issue.reporter_id,
      name: issue.reporter_name,
      role: issue.reporter_role,
    },

    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };

  return formattedData;
};

export default issueFormatter;