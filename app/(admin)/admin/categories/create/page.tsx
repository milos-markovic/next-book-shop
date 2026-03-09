import CreateCategoryForm from "./components/CreateCategoryForm"

const CreateCategory = async () => {
  return (
    <>
        <h2 className='text-xl mb-8'>Create Category</h2>

        <CreateCategoryForm />      
    </>
  )
}

export default CreateCategory