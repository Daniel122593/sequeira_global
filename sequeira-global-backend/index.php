<?php

require_once 'vendor/autoload.php';

$app = new \Slim\Slim();

$db = new mysqli('localhost', 'root', '', 'sequeira_global_database');

// Configuración de cabeceras
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}



//date_default_timezone_get();


$app->get("/pruebas", function() use($app, $db){
	
	echo gmdate('H:i:s');
});




$app->get('/hour', function() use($db, $app){

	$hora=gmdate('H:i:s');



	
	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $hora
		);

	echo json_encode($result);
});



$app->get("/probando", function() use($app){
	echo "OTRO TEXTO CUALQUIERA";
});



// LISTAR TODOS LAS SEÑALES DEL DIA
$app->get('/user_administrative', function() use($db, $app){

	 
	$sql = 'SELECT * FROM user_administrative';
	$query = $db->query($sql);

	$user_array = array();
	while ($user = $query->fetch_assoc()) {
		$user_array[] = $user;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $user_array
		);

	echo json_encode($result);
});




// LISTAR TODOS LAS SEÑALES DEL DIA
$app->get('/signal', function() use($db, $app){

	 $anno=gmdate('Y-m-d');
	 $anno=(String)


	$sql = 'SELECT * FROM signal_app WHERE date_signal="'.$anno.'"';
	$query = $db->query($sql);

	$signal_array = array();
	while ($signal = $query->fetch_assoc()) {
		$signal_array[] = $signal;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $signal_array
		);

	echo json_encode($result);
});




// LISTAR TODOS LOS PRODUCTOS DEL MES
$app->get('/signalMonth', function() use($db, $app){

	$anno=gmdate('Y');
	$mes=gmdate('m');
	$anno=(String)
	$mes=(String)


	$sql = 'SELECT * FROM signal_app WHERE year="'.$anno.'" AND 
	 month="'.$mes.'"';
	$query = $db->query($sql);

	$signal_array = array();
	while ($signal = $query->fetch_assoc()) {
		$signal_array[] = $signal;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $signal_array
		);

	echo json_encode($result);
});


//LISTAR TODOS LOS PRODUCTOS 
$app->get('/signalAll', function() use($db, $app){

	$anno=gmdate('Y');
	$mes=gmdate('m');
	$anno=(String)
	$mes=(String)


	$sql = 'SELECT * FROM signal_app';
	$query = $db->query($sql);

	$signal_array = array();
	while ($signal = $query->fetch_assoc()) {
		$signal_array[] = $signal;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $signal_array
		);

	echo json_encode($result);
});


// MOSTRAR EL DETALLE DE UNA SEÑAL EN ESPECIFICO
$app->get('/signal/:id', function($id) use($db, $app){
	$sql = 'SELECT * FROM signal_app WHERE id = '.$id;
	$query = $db->query($sql);

	$result = array(
		'status' 	=> 'error',
		'code'		=> 404,
		'message' 	=> 'Signal no disponible'
	);

	if($query->num_rows == 1){
		$signal = $query->fetch_assoc();

		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'data' 	=> $signal
		);

	}//fin del if

	echo json_encode($result);
});



//MOSTRAR EL DETALLE DE UNA SEÑAL EN ESPECIFICO QUE SE ENCUENTRA CERRADA
$app->get('/signalClose/:id', function($id) use($db, $app){
	$sql = 'SELECT * FROM signal_app WHERE id = '.$id;
	$query = $db->query($sql);

	$result = array(
		'status' 	=> 'error',
		'code'		=> 404,
		'message' 	=> 'Signal no disponible'
	);

	if($query->num_rows == 1){
		$signal = $query->fetch_assoc();

		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'data' 	=> $signal
		);

	}//fin del if

	echo json_encode($result);
});

// ELIMINAR UN PRODUCTO 
$app->get('/delete-signal/:id', function($id) use($db, $app){
	$sql = 'DELETE FROM signal_app WHERE id = '.$id;
	$query = $db->query($sql);

	if($query){
		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'message' 	=> 'El producto se ha eliminado correctamente!!'
		);
	}else{
		$result = array(
			'status' 	=> 'error',
			'code'		=> 404,
			'message' 	=> 'El producto no se ha eliminado!!'
		);
	}

	echo json_encode($result);
});


// SUBIR UNA IMAGEN A UN PRODUCTO
$app->post('/upload-file', function() use($db, $app){
	$result = array(
		'status' 	=> 'error',
		'code'		=> 404,
		'message' 	=> 'El archivo no ha podido subirse'
	);

	if(isset($_FILES['uploads'])){
		$piramideUploader = new PiramideUploader();

		$upload = $piramideUploader->upload('image', "uploads", "uploads", array('image/jpeg', 'image/png', 'image/gif'));
		$file = $piramideUploader->getInfoFile();
		$file_name = $file['complete_name'];

		if(isset($upload) && $upload["uploaded"] == false){
			$result = array(
				'status' 	=> 'error',
				'code'		=> 404,
				'message' 	=> 'El archivo no ha podido subirse'
			);
		}else{
			$result = array(
				'status' 	=> 'success',
				'code'		=> 200,
				'message' 	=> 'El archivo se ha subido',
				'filename'  => $file_name
			);
		}
	}

	echo json_encode($result);
});


$app->post('/signal', function() use($app, $db){
	$json = $app->request->post('json');
	$data = json_decode($json, true);

    var_dump($json);
	var_dump($data);
    

    $hora=gmdate('H:i:s');
	


       $data['close_price']="";
       $data['pip']="";
       $data['graph_final']="";
       $data['date_final']="";
       $data['type_trend_final']="";
       $data['time_final']="";

       $fecha=$data['date'];

       list($anno, $mes, $dia) = explode("-", $fecha);



	$query = "INSERT INTO signal_app VALUES(NULL,".
			 "'{$data['instrument']}',".
			 "'{$data['open_price']}',".
			 "'{$data['trend']}',".
			 "'{$data['tp1']}',".
			 "'{$data['tp2']}',".
			 "'{$data['sl']}',".
			 "'{$data['graph_image']}',".
			 "'{$data['condition_signal']}',".
			 "'{$data['analyst']}',".
             "'{$data['close_price']}',".
             "'{$data['pip']}',".
             "'{$data['graph_final']}',".
             "'{$data['type_trend']}',".
             "'{$data['type_trend_final']}',".
             "'".$anno."',".
			 "'".$mes."',".
			 "'".$dia."',".
			 "'".$fecha."',".
			 "'{$data['date_final']}',".
			 "'".$hora."',".
			 "'{$data['time_final']}',".
			 "'1'".
			 ");";

	$insert = $db->query($query);

	$result = array(
		'status' => 'error',
		'code'	 => 404,
		'message' => 'Producto NO se ha creado'
	);

	if($insert){
		$result = array(
			'status' => 'success',
			'code'	 => 200,
			'message' => 'Producto creado correctamente'
		);
	}

	echo json_encode($result);
});


//MODIFICA LOS DATOS DE UNA SEÑAL EN ESPECIFICO
$app->post('/signal-update/:id', function($id) use($app, $db){
	$json = $app->request->post('json');
	$data = json_decode($json, true);

    var_dump($json);
	var_dump($data);

	$hora=gmdate('H:i:s');
 

    $sql = "UPDATE signal_app SET ".
		   "instrument = '{$data["instrument"]}', ".
		   "open_price = '{$data["open_price"]}', ".
		   "trend = '{$data["trend"]}', ".
		   "tp1 = '{$data["tp1"]}', ".
		   "tp2 = '{$data["tp2"]}', ".
		   "sl = '{$data["sl"]}', ".
		   "close_price = '{$data["close_price"]}', ".
		   "pip = '{$data["pip"]}', ".
		   "graph_final = '{$data["graph_final"]}', ".
		   "type_trend = '{$data["type_trend"]}', ".
		   "type_trend_final = '{$data["type_trend_final"]}', ".
		   "time_final='".$hora."',".
		   "date_final = '{$data["date_final"]}', ";


		      if(isset($data['graph'])){
 		$sql .= "graph_image = '{$data["graph"]}', ";
			  } 


		$sql.= "year = '{$data["year"]}', ".
		   "month = '{$data["month"]}', ".
		   "day = '{$data["day"]}',".
		   "state_signal = '2',".
		   "date_signal = '{$data["date"]}' WHERE id = {$id}";

	$query = $db->query($sql);

	if($query){
		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'message' 	=> 'El producto se ha actualizado correctamente!!'
		);
	}else{
		$result = array(
			'status' 	=> 'error',
			'code'		=> 404,
			'message' 	=> 'El producto no se ha actualizado!!'
		);
	}//fin del else


	echo json_encode($result);
   
});


//este metodo inserta los usuarios preferentes
$app->post('/user_partner', function() use($app, $db){
	$json = $app->request->post('json');
	$data = json_decode($json, true);

    var_dump($json);
	var_dump($data);
    

    $hora=gmdate('H:i:s');
	


	$query = "INSERT INTO user_partner VALUES(NULL,".
			 "'{$data['identityCard_partner']}',".
			 "'{$data['name_partner']}',".
			 "'{$data['gender_partner']}',".
			 "'{$data['civil_status_partner']}',".
			 "'{$data['profession_partner']}',".
			 "'{$data['email_partner']}',".
			 "'{$data['telephone_partner']}',".
			 "'{$data['country_partner']}',".
			 "'{$data['address_partner']}',".
             "'{$data['investment_amount_partner']}',".
             "'{$data['time_partner']}',".
             "'{$data['interest_partner']}',".
             "'{$data['referred_partner']}',".
             "'{$data['date_start_partner']}',".
             "'{$data['date_end_partner']}',".
			 "'{$data['img_identity_partner']}',".
			 "'{$data['img_voucher_partner']}'".
			 ");";

	$insert = $db->query($query);

	$result = array(
		'status' => 'error',
		'code'	 => 404,
		'message' => 'Partner ingresado correctamente'
	);

	if($insert){
		$result = array(
			'status' => 'success',
			'code'	 => 200,
			'message' => 'Partner no ingresado'
		);
	}

	echo json_encode($result);
});



//ESTE METODO TRAE EL ID Y NOMBRE DE LOS USUARIOS PREFERENTES
$app->get('/user_partner_simple', function() use($db, $app){

	$sql = 'SELECT id, name_partner FROM user_partner';
	$query = $db->query($sql);

	$information_partner = array();
	while ($user = $query->fetch_assoc()) {
		$information_partner[] = $user;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $information_partner
		);

	echo json_encode($result);
});

 
//INSERTA LOS DATOS DEL BANCO DE LOS DIFERENTES USUARIOS PREFERENTES
$app->post('/bank_partner', function() use($app, $db){
	$json = $app->request->post('json');
	$data = json_decode($json, true);

    var_dump($json);
	var_dump($data);
    

    $hora=gmdate('H:i:s');
	
	$query = "INSERT INTO bank_partner VALUES(NULL,".
			 "'{$data['name_bank']}',".
			 "'{$data['number_count_bank']}',".
			 "'{$data['count_sinpe_bank']}',".
			 "'{$data['id_partner']}'".
			 ");";

	$insert = $db->query($query);

	$result = array(
		'status' => 'error',
		'code'	 => 404,
		'message' => 'Datos del Banco ingresados correctamente'
	);

	if($insert){
		$result = array(
			'status' => 'success',
			'code'	 => 200,
			'message' => 'Datos del Banco no ingresados'
		);
	}

	echo json_encode($result);
});






//este metodo inserta los usuarios administrativos
$app->post('/user_administrative', function() use($app, $db){
	$json = $app->request->post('json');
	$data = json_decode($json, true);

    var_dump($json);
	var_dump($data);
    

	$query = "INSERT INTO user_administrative VALUES(NULL,".
			 "'{$data['identityCard']}',".
			 "'{$data['name_administrative']}',".
			
		
			
			 "'{$data['email_administrative']}',".
			 "'{$data['password_administrative']}',".

			 "'{$data['telephone_administrative']}',".
			 "'{$data['country_administrative']}',".
			 "'{$data['address_administrative']}',".
             "'{$data['date_administrative']}',".
             "'{$data['hierarchy_administrative']}',".
             "'{$data['profile_picture_administrative']}'".
             ");";

	$insert = $db->query($query);

	$result = array(
		'status' => 'error',
		'code'	 => 404,
		'message' => 'Partner ingresado correctamente'
	);

	if($insert){
		$result = array(
			'status' => 'success',
			'code'	 => 200,
			'message' => 'Partner no ingresado'
		);
	}

	echo json_encode($result);
});


// MOSTRAR EL DETALLE DE UNA USUARIO ADMINISTRATIVO EN ESPECÍFICO
$app->get('/user_administrative/:id', function($id) use($db, $app){
	$sql = 'SELECT * FROM user_administrative WHERE id = '.$id;
	$query = $db->query($sql);

	$result = array(
		'status' 	=> 'error',
		'code'		=> 404,
		'message' 	=> 'Usuario no disponible'
	);

	if($query->num_rows == 1){
		$user_admi = $query->fetch_assoc();

		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'data' 	=> $user_admi
		);
	}

	echo json_encode($result);
});


//MODIFICA LOS DATOS DE UN USUARIO ADMINISTRADOR ESPECIFICO
$app->post('/userAdministrative-update/:id', function($id) use($app, $db){
	$json = $app->request->post('json');
	$data = json_decode($json, true);

    var_dump($json);
	var_dump($data);

	$hora=gmdate('H:i:s');
 

    $sql = "UPDATE user_administrative SET ".
		   "telephone_administrative = '{$data["telephone_administrative"]}', ".
		   "country_administrative = '{$data["country_administrative"]}', ".
		   "hierarchy_administrative = '{$data["hierarchy_administrative"]}', ".
		   "profile_picture_administrative = '{$data["profile_picture_administrative"]}', ".
           "address_administrative = '{$data["address_administrative"]}' WHERE id = {$id}";
           
	 $query = $db->query($sql);

	if($query){
		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'message' 	=> 'El producto se ha actualizado correctamente!!'
		);
	}else{
		$result = array(
			'status' 	=> 'error',
			'code'		=> 404,
			'message' 	=> 'El producto no se ha actualizado!!'
		);
	}//fin del else


	echo json_encode($result);
   
});



//este metodo inserta los usuarios analistas
$app->post('/user_analyst', function() use($app, $db){
	$json = $app->request->post('json');
	$data = json_decode($json, true);

    var_dump($json);
	var_dump($data);
    

	$query = "INSERT INTO user_analyst VALUES(NULL,".
			 "'{$data['identityCard_analyst']}',".
			 "'{$data['name_analyst']}',".
			 "'{$data['email_analyst']}',".
			 "'{$data['password_analyst']}',".
             "'{$data['telephone_analyst']}',".
			 "'{$data['country_analyst']}',".
			 "'{$data['address_analyst']}',".
             "'{$data['date_analyst']}',".
             "'{$data['hierarchy_analyst']}',".
             "'{$data['profile_picture_analyst']}'".
             ");";
             
	$insert = $db->query($query);

	$result = array(
		'status' => 'error',
		'code'	 => 404,
		'message' => 'Usuario analista ingresado correctamente'
	);

	if($insert){
		$result = array(
			'status' => 'success',
			'code'	 => 200,
			'message' => 'Usuario analista no ingresado'
		);
	}

	echo json_encode($result);
});




//LISTAR TODOS LOS USUARIOS ANALISTAS
$app->get('/user_analyst', function() use($db, $app){


	$sql = 'SELECT * FROM user_analyst';
	$query = $db->query($sql);

	$user_array = array();
	while ($user = $query->fetch_assoc()) {
		$user_array[] = $user;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $user_array
		);

	echo json_encode($result);
});


// MOSTRAR EL DETALLE DE UNA USUARIO ANALISTA EN ESPECÍFICO
$app->get('/user_analyst/:id', function($id) use($db, $app){
	$sql = 'SELECT * FROM user_analyst WHERE id = '.$id;
	$query = $db->query($sql);

	$result = array(
		'status' 	=> 'error',
		'code'		=> 404,
		'message' 	=> 'Usuario no disponible'
	);

	if($query->num_rows == 1){
		$user_ana = $query->fetch_assoc();

		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'data' 	=> $user_ana
		);

	}//fin del if

	echo json_encode($result);
});




//MODIFICA LOS DATOS DE UN USUARIO ANALISTA ESPECIFICO
$app->post('/userAnalyst-update/:id', function($id) use($app, $db){
	$json = $app->request->post('json');
	$data = json_decode($json, true);

    var_dump($json);
	var_dump($data);

	$hora=gmdate('H:i:s');
 

    $sql = "UPDATE user_analyst SET ".
		   "telephone_analyst = '{$data["telephone_analyst"]}', ".
		   "country_analyst = '{$data["country_analyst"]}', ".
		   "hierarchy_analyst = '{$data["hierarchy_analyst"]}', ".
		   "profile_picture_analyst = '{$data["profile_picture_analyst"]}', ".
           "address_analyst = '{$data["address_analyst"]}' WHERE id = {$id}";
           
	 $query = $db->query($sql);

	if($query){
		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'message' 	=> 'El usuario se ha actualizado correctamente!!'
		);
	}else{
		$result = array(
			'status' 	=> 'error',
			'code'		=> 404,
			'message' 	=> 'El usuario no se ha actualizado!!'
		);
	}//fin del else

	echo json_encode($result);
   
});




//ESTE METODO TRAE EL ID Y NOMBRE DE LOS USUARIOS ANALISTAS
$app->get('/user_analyst_simple', function() use($db, $app){

	$sql = 'SELECT id, name_analyst FROM user_analyst';
	$query = $db->query($sql);

	$information_analyst = array();
	while ($user = $query->fetch_assoc()) {
		$information_analyst[] = $user;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $information_analyst
		);

	echo json_encode($result);
});




//ESTE METODO TRAE EL NOMBRE DE UN USUARIO ANALISTA EN ESPECIFICO
$app->get('/user_analyst_name/:id', function($id) use($db, $app){

	$sql = 'SELECT name_analyst FROM user_analyst WHERE id='.$id;
	$query = $db->query($sql);

	$result = array(
		'status' 	=> 'error',
		'code'		=> 404,
		'message' 	=> 'Nombre de usuario no disponible'
	);

   if($query->num_rows == 1){
		$user_analy = $query->fetch_assoc();

		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'data' 	=> $user_analy
		);

	}//fin del if

     echo json_encode($result);
});





//LISTAR TODOS LOS USUARIOS PREFERENTES
$app->get('/user_partner', function() use($db, $app){


	$sql = 'SELECT * FROM user_partner';
	$query = $db->query($sql);

	$user_array = array();
	while ($user = $query->fetch_assoc()) {
		$user_array[] = $user;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $user_array
		);

	echo json_encode($result);
});



//MOSTRAR EL DETALLE DE UNA USUARIO PREFERENTE EN ESPECÍFICO
$app->get('/user_partner/:id', function($id) use($db, $app){
	$sql = 'SELECT * FROM user_partner WHERE id = '.$id;
	$query = $db->query($sql);

	$result = array(
		'status' 	=> 'error',
		'code'		=> 404,
		'message' 	=> 'Usuario no disponible'
	);

	if($query->num_rows == 1){
		$user_part = $query->fetch_assoc();

		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'data' 	=> $user_part
		);

	}//fin del if

	echo json_encode($result);
});



//MODIFICA LOS DATOS DE UN USUARIO PREFERENTE ESPECIFICO
$app->post('/user_partner-update/:id', function($id) use($app, $db){
	$json = $app->request->post('json');
	$data = json_decode($json, true);

    var_dump($json);
	var_dump($data);

	$hora=gmdate('H:i:s');
 
    $sql = "UPDATE user_partner SET ".
           "profession_partner = '{$data["profession_partner"]}', ".
		   "email_partner = '{$data["email_partner"]}', ".
		   "telephone_partner = '{$data["telephone_partner"]}', ".
		   "country_partner = '{$data["country_partner"]}', ".
		   "address_partner = '{$data["address_partner"]}', ".
		   "civil_status_partner = '{$data["civil_status_partner"]}', ".
		   "date_end_partner = '{$data["date_end_partner"]}', ".
		   "img_identity_partner = '{$data["img_identity_partner"]}', ".
		   "img_voucher_partner = '{$data["img_voucher_partner"]}' WHERE id = {$id}";
       
	 $query = $db->query($sql);

	if($query){
		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'message' 	=> 'El usuario se ha actualizado correctamente!!'
		);
	}else{
		$result = array(
			'status' 	=> 'error',
			'code'		=> 404,
			'message' 	=> 'El usuario no se ha actualizado!!'
		);
	}//fin del else

	echo json_encode($result);
   
});

//ingresa los usuarios clientes que se registran en la aplicacion.
$app->post('/user_client', function() use($app, $db){
	$json = $app->request->post('json');
	$data = json_decode($json, true);

    
	var_dump($data); 

	for($i=0;$i<count($data);$i++){

	$data[$i] = (object) $data[$i];
  
       if($data[$i]->Name==""){
         
         $data[$i]->Name="Daniel";

       }

        if($data[$i]->Email==""){
         
         $data[$i]->Email="Daniel";

       }

        if($data[$i]->ReferCode==""){
         
         $data[$i]->ReferCode="Daniel";

       }

        if($data[$i]->Country==""){
         
         $data[$i]->Country="Daniel";

       }

        if($data[$i]->Telephone==""){
         
         $data[$i]->Telephone="Daniel";

       }

        if($data[$i]->Date==""){
         
         $data[$i]->Date="Daniel";

       }


	$query = "INSERT INTO user_client VALUES(NULL,".
			 "'{$data[$i]->Name}',".
			 "'{$data[$i]->Email}',".
			 "'{$data[$i]->ReferCode}',".
			 "'{$data[$i]->Country}',".
             "'{$data[$i]->Telephone}',".
			 "'{$data[$i]->Date}'".
			
             ");";

	      $insert = $db->query($query);

	}//fin del for

});

$app->run();



