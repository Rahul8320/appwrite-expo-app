import { createContext, useContext, useEffect, useState } from "react";
import { IdeasService } from "../services/ideas.service";
import { toast } from "../utils/toast";

const IdeasContext = createContext();

export function useIdeas() {
  return useContext(IdeasContext);
}

export function IdeasProvider({ children }) {
  const [ideas, setIdeas] = useState([]);
  const ideasService = new IdeasService();

  async function add(idea) {
    const result = await ideasService.createNewDocument(idea);
    if (result) {
      setIdeas((prev) => [result, ...prev].slice(0, 10));
      toast("Idea added");
    } else {
      toast("Failed to create idea!");
    }
  }

  async function remove(id) {
    const result = await ideasService.removeDocumentById(id);
    if (result) {
      setIdeas((prev) => prev.filter((item) => item.$id !== id));
      toast("Idea removed");
    } else {
      toast("Failed to remove idea!");
    }
  }

  async function init() {
    const result = await ideasService.listAllDocuments();
    if (result) {
      setIdeas(result.documents);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <IdeasContext.Provider value={{ current: ideas, add, remove }}>
      {children}
    </IdeasContext.Provider>
  );
}
