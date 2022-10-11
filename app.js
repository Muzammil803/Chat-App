
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth,
	onAuthStateChanged,
	sendEmailVerification,
	 createUserWithEmailAndPassword ,
	 signInWithEmailAndPassword 
	} 
	 from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
	 import {
		doc,
		setDoc,
		getFirestore,
		getDoc,
		collection,
		query,
		where,
		getDocs,
		addDoc,
		onSnapshot,
		orderBy,
		updateDoc,
	  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
	  import {
		getStorage,
		ref,
		uploadBytesResumable,
		getDownloadURL,
	  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
	  
	  
const firebaseConfig = {
  apiKey: "AIzaSyBv9_a4IKCKMVskddliTFvskp8h4BbIKe4",
  authDomain: "natterchat-aac12.firebaseapp.com",
  projectId: "natterchat-aac12",
  storageBucket: "natterchat-aac12.appspot.com",
  messagingSenderId: "1084309870068",
  appId: "1:1084309870068:web:0376f2675aeade2b1255a1",
  measurementId: "G-E2X9BB84P4"
};

// //////////////////// Login / signup Authentication START ///////////////////////////


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const analytics = getAnalytics(app);
const auth = getAuth();
let nameReg = /(^[a-zA-Z]+$)/
let emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
const Password_regex = /([^\s])/;
	

const register= ()=>{

	let email = document.getElementById("email")
	let password = document.getElementById("Password");
	let username = document.getElementById("username");
	let emailval=email.value
let passwordval=password.value
let usernameval=username.value
let myFile = document.getElementById("my-file");
let file = myFile.files[0];
// console.log( passwordval , emailval )
// console.log("pass"+ Password_regex.test(passwordval) )
// console.log( "email"+ emailReg.test(emailval) )
// console.log( "user"+ nameReg.test(usernameval) )

	console.log( file)
	if(file){
let arr=file.name.split(".")
if(arr[arr.length - 1]=="png"||arr[arr.length - 1]=="jpg"||arr[arr.length - 1]=="jpeg" ){

	var fileCheck = true
}else{
	swal({
		title: "Invalid image",
		text: "image type should be PNG, JPG anf.",
		icon: "warning",
		button: "ok",
	  });
	}

	}else{
		swal({
			title: "select profile pic",
			text: "This email adress is already taken .",
			icon: "warning",
			button: "ok",
		  });
	var	fileCheck = false
	}
	console.log(fileCheck)



	if(nameReg.test(usernameval)==true &&  Password_regex.test(passwordval)==true && fileCheck){
console.log(email , password)
		createUserWithEmailAndPassword(auth, emailval, passwordval)
		.then( async(userCredential) => {
			let uid = userCredential.user.uid;
			let firDoc = doc(db, "users", uid);

			// const auth = getAuth();
			// let uid = auth.currentUser.uid;
			let url = await uploadFiles(file);
			console.log(url)

			await setDoc(firDoc, {
			  name: usernameval,
			  email: emailval,
			  password: password.value,
			  profile: url

			});


		  const user = userCredential.user;
		  console.log("log "+ user)

		  if(user){

			console.log("dsfsdfgg")
			setTimeout(function(){
				document.getElementById("login").style.height=" 500px"
		
		},1000)
			document.getElementById("signup").style.height="0"
			setTimeout(function(){
				document.getElementById("signup").style.display="none"
				document.getElementById("login").style.display="flex"
				
		},900)
		  }
		})
		.catch((error) => {
		  const errorCode = error.code;
		  const errorMessage = error.message;
		  console.log("error "+ errorMessage)
		  if(errorMessage=="Firebase: Error (auth/email-already-in-use)."){
			swal({
				title: "invalid Email",
				text: "This email adress is already taken .",
				icon: "warning",
				button: "ok",
			  });
		}
		if(errorMessage=="Firebase: Password should be at least 6 characters (auth/weak-password)."){
			swal({
				title: "Weak Password",
				text: "Password should be atleaast 6 character .",
				icon: "warning",
				button: "ok",
			});
		}
		if(errorMessage=="Firebase: Error (auth/invalid-email)."){
			swal({
				title: "invalid Email",
				text: "Please enter correct email  .",
				icon: "warning",
				button: "ok",
			  });
		}
		if(errorMessage=="Firebase: Error (auth/missing-email)."){
			swal({
				title: "invalid Email",
				text: "Please enter correct email  .",
				icon: "warning",
				button: "ok",
			  });
		}
	});
	
	
}




				if(!Password_regex.test(passwordval)){	  

					swal({
						title: "invalid Password",
						text: "Password should be atleaast 6 character .",
						icon: "warning",
						button: "ok",
					  });


	}
	
	
	
	
			// if(!emailReg.test(emailval)){

			// 	swal({
			// 		title: "invalid Email",
			// 		text: "Please enter correct email address .",
			// 		icon: "warning",
			// 		button: "ok",
			// 	});

			// }
			if(!nameReg.test(usernameval)){
				
					swal({
						title: "invalid Username",
						text: "Username should be a word without space .",
						icon: "warning",
						button: "ok",
					  });
			}

}
try{
let reg_btn = document.getElementById("sign")
	reg_btn.addEventListener("click",register)


	document.getElementById("log").addEventListener("click",()=>{
		let l_email= document.getElementById("l-email")
		let l_password= document.getElementById("l-password")
console.log(l_email.value)
console.log(l_password.value)
		signInWithEmailAndPassword(auth, l_email.value, l_password.value)
  .then((userCredential) => {
    const user = userCredential.user;
	console.log(user)
	if(user){

	
			window.location.href="index2.html"
	
					
	
	}
  })
  
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
	console.log(errorMessage)

	if(errorMessage){
		swal({
			title: "invalid Email or Password",
			text: "Please enter correct email or Password  .",
			icon: "warning",
			button: "ok",
		  });
	}
  });
		
})

		
		
		

	let haveaccont = document.getElementById("haveaccont")
	haveaccont.addEventListener("click",()=>{
		console.log("dsfsdfgg")
			setTimeout(function(){
				document.getElementById("login").style.height=" 500px"
		
		},1000)
			document.getElementById("signup").style.height="0"
			setTimeout(function(){
				document.getElementById("signup").style.display="none"
				document.getElementById("login").style.display="flex"
				
		},900)

			})	
		}catch(err){
			console.log("err", err)
		}
		

// //////////////////// Login / signup Authentication END ///////////////////////////






// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   sendEmailVerification,
// } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
// import {
//   doc,
//   setDoc,
//   getFirestore,
//   getDoc,
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
//   onSnapshot,
//   Timestamp,
// } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyBv9_a4IKCKMVskddliTFvskp8h4BbIKe4",
//   authDomain: "natterchat-aac12.firebaseapp.com",
//   projectId: "natterchat-aac12",
//   storageBucket: "natterchat-aac12.appspot.com",
//   messagingSenderId: "1084309870068",
//   appId: "1:1084309870068:web:0376f2675aeade2b1255a1",
//   measurementId: "G-E2X9BB84P4"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const register = () => {
//   const name = document.getElementById("name");
//   const email = document.getElementById("email");
//   const password = document.getElementById("password");
//   const auth = getAuth();
//   createUserWithEmailAndPassword(auth, email.value, password.value)
//     .then(async (userCredential) => {
//       let uid = userCredential.user.uid;
//       let firDoc = doc(db, "users", uid);
//       await setDoc(firDoc, {
//         name: name.value,
//         email: email.value,
//         password: password.value,
//       });
//     })
//     .catch((error) => {
//       const errorMessage = error.message;
//       console.log(errorMessage);
//     });
// };

// const btn = document.getElementById("register-btn");

// btn.addEventListener("click", register);

// const login = () => {
//   const email = document.getElementById("l-email");
//   const password = document.getElementById("l-password");
//   const auth = getAuth();
//   signInWithEmailAndPassword(auth, email.value, password.value)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       // console.log("user", user);
//     })
//     .catch((error) => {
//       const errorMessage = error.message;
//       console.log(errorMessage);
//     });
// };

// const loginBtn = document.getElementById("login-btn");
// try{
// loginBtn.addEventListener("click", login);
// }catch(err){console.log("error " ,err)}
window.onload = async () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (!user.emailVerified) {
        // sendEmailVerification(auth.currentUser)
        //   .then(() => {
        //     console.log("Email sent");
        //   })
        //   .catch((err) => console.log(err));
	}
	// window.location.href="index2.html"

	console.log(user)
      getUserFromDataBase(user.uid);
    } else {
      console.log("not login");
    }
  });
};

const getUserFromDataBase = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  let currentUser = document.getElementById("current-user");
  if (docSnap.exists()) {

    // currentUser.innerHTML = `${docSnap.data().name} (${docSnap.data().email})`;
    currentUser.innerHTML = ` <img src="${docSnap.data().profile}" alt="" class="user_head_img">
	<h3>Natter Chat</h3>

	<ion-icon class="search_icon_left" name="search"></ion-icon>
`;
	console.log(docSnap.data().profile)
    getAllUsers(docSnap.data().email, uid, docSnap.data().name , docSnap.data().profile);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
const getAllUsers = async (email, currentId, currentName,senderDp) => {
  const q = query(collection(db, "users"), where("email", "!=", email));
  const querySnapshot = await getDocs(q);
  let users = document.getElementById("users");
 try{
  querySnapshot.forEach((doc) => {
    users.innerHTML += `
	
	<div class="user_chat"  onclick='startChat("${
		doc.id
	  }","${
		doc.data().name
	  }","${currentId}","${currentName}","${doc.data().profile}","${senderDp}")'  >
	<img src="${doc.data().profile}" alt="" class="user_head_img">
	<h4>${doc.data().name} </h4>
	
</div>

	
	
`


let send = document.getElementById("send")
send.addEventListener("click", async () => {
	// let chatID;
if (doc.id < currentId) {
  var  chatID = `${doc.id}${currentId}`;
  } else {
  var  chatID = `${currentId}${doc.id}`;

  }
console.log(chatID)
;
	let message = document.getElementById("message");
	let allMessages = document.getElementById("all-messages");
		allMessages.innerHTML = "";
		// const q = await query(collection(db, "messages"), where("chat_id", "==", chatID) )
	 
	
		await addDoc(collection(db, "messages"), {
		  sender_name: currentName,
		  receiver_name: doc.data().name,
		  sender_id: currentId,
		  receiver_id: doc.id,
		  chat_id: chatID,
		  message: message.value,
		  profile:doc.data().profile,
		  profileSender:senderDp,
		  timestamp: new Date(),
		});
	  }
	
  
)

  })}catch(err){console.log(err)};
};

let startChat = (id, name, currentId, currentName,profilePic,senderDp) => {
  let chatWith = document.getElementById("chat-with");
  chatWith.innerHTML =` <img src="${profilePic}" alt="" class="user_head_img">
  <h3 class="chat_head_name" >${name} </h3>`;
  let send = document.getElementById("send");
  let message = document.getElementById("message");
  console.log(senderDp)
//   let chatID;
//   if (id < currentId) {
//     chatID = `${id}${currentId}`;
//   } else {
//     chatID = `${currentId}${id}`;

//   }
//   console.log(chatID)
//   addDoc(collection(db,"messages"),{chat_id:chatID})

  loadAllChats(id , currentId);

//   try{
//   send.addEventListener("click", async () => {
// 	console.log(chatID)

//     let allMessages = document.getElementById("all-messages");
//     allMessages.innerHTML = "";
// 	const q = await query(collection(db, "messages"), where("chat_id", "==", chatID) )
 

//     await addDoc( collection(db, "messages"), {
//       sender_name: currentName,
//       receiver_name: name,
//       sender_id: currentId,
//       receiver_id: id,
//       chat_id: chatID,
//       message: message.value,
// 	  profile:profilePic,
// 	  profileSender:senderDp,
//       timestamp: new Date(),
//     });
//   })
// }catch(err){console.log(err)};
};

	
const loadAllChats = (id , currentId) => {

	let chatID;
  if (id < currentId) {
    chatID = `${id}${currentId}`;
  } else {
    chatID = `${currentId}${id}`;

  }
  console.log( "load chat=>",chatID)
  const q = query(collection(db, "messages"), where("chat_id", "==", chatID), 
  orderBy ("timestamp", "desc")
  );
  console.log(chatID)

  let allMessages = document.getElementById("all-messages");
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    allMessages.innerHTML = "";
	// console.log(currentId)
    querySnapshot.forEach((doc) => {
console.log(doc.data())
		if(doc.data().sender_id==currentId){
console.log(doc.data().profileSender)
console.log(doc.data().profile)
			allMessages.innerHTML += `
	  
			<div class="message_box_right">
			<div class="message_text">
			<p>
			${(doc.data()).message}
			</p>
			</div>
			<img src="${doc.data().profileSender}" alt="">
			
			
			
			</div>
			
				 
				 
				 `;

		}else{
			allMessages.innerHTML += `
	  
			<div class="message_box">
			<img src="${doc.data().profileSender}" alt="">
			<div class="message_text">
			<p>
			${(doc.data()).message}
			</p>
			</div>
			
			
			
			</div>
			
				 
				 
				 `;


		}
     
    });
  });
};

window.startChat = startChat;


// let uploadBtn = document.getElementById("upload-btn");

// uploadBtn.addEventListener("click", async () => {
//   let myFile = document.getElementById("my-file");
//   let file = myFile.files[0];
//   const auth = getAuth();
//   let uid = auth.currentUser.uid;
//   let url = await uploadFiles(file);
//   console.log(url)
//   const washingtonRef = doc(db, "users", uid);
//   await updateDoc(washingtonRef, {
//     profile: url,
//   });
// });

const uploadFiles = (file) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const auth = getAuth();
    let uid = auth.currentUser.uid;
    const storageRef = ref(storage, `users/${uid}.png`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};














