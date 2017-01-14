<h2><?php echo $title; ?></h2>

<?php echo validation_errors(); ?>
<?php $urlarray=explode("/",$_SERVER['REQUEST_URI']); $slug=$urlarray[sizeof($urlarray)-1];?>
<?php  echo form_open('news/update/'.$slug) ;?>

<label for="title">Title</label>
<input type="input" name="title" /><br />

<label for="text">Text</label>
<textarea name="text"></textarea><br />

<input type="submit" name="submit" value="Update news item" />

</form>
