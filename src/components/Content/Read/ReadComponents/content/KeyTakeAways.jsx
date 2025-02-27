const KeyTakeAways = ({ key_takeaways }) => {
  return (
    <div className="px-8 py-6">
      <ul className="space-y-4">
        {key_takeaways.map((takeaway, index) => (
          <li 
            key={index}
            className="flex text-zinc-600 dark:text-zinc-200"
          >
            <span className="mr-2">•</span>
            <span>{takeaway}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default KeyTakeAways
