using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Todo
{
    public int Id { get; set; }

    public string Title { get; set; }

    public bool? Completed { get; set; }

    public DateTime? CompletedDate { get; set; }
}
