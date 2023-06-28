const DiaryEntryForm = () => {
  return (
    <div>
      <h2>Add new entry</h2>
      <div>
        <form>
          <div>
            date <input />
          </div>
          <div>
            visibility <input />
          </div>
          <div>
            weather <input />
          </div>
          <div>
            comment <input />
          </div>
          <button type="submit">add</button>
        </form>
      </div>
      <h5>Diary entry form here</h5>
    </div>
  );
};

export default DiaryEntryForm;