<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>File upload</title>
</head>
<body>
    <div class="container">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h2>Magánklinika Profilkép feltöltés</h2>
            </div>
            <div class="panel-body">
                @if ($message = Session::get('success'))
                    <div class="alert alert-success alert-block">
                        <strong>{{ $message }}</strong>
                    </div>
                @endif
                <form action="{{ route('file.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="mb-3">
                        <label class="form-label" for="inputFile">File:</label>
                        <input 
                            type="file" 
                            name="file" 
                            id="inputFile">
          
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-success">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>