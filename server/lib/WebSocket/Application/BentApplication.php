<?php

namespace WebSocket\Application;

/**
 * Websocket-Server demo and test application.
 *
 * @author Simon Samtleben <web@lemmingzshadow.net>
 */
class BentApplication extends Application
{
  private $_clients = array();
	private $_filename = '';

	public function onConnect($client)
  {
		$id = $client->getClientId();
    $this->_clients[$id] = $client;
  }

  public function onDisconnect($client)
  {
    $id = $client->getClientId();
		unset($this->_clients[$id]);
  }

  public function onData($data, $client)
  {
    $decodedData = $this->_decodeData($data);
		if($decodedData === false)
		{
		  // @todo: invalid request trigger error...
    }
    $actionName = '_action' . ucfirst($decodedData['action']);
    if(method_exists($this, $actionName))
  	{
  		call_user_func(array($this, $actionName), $decodedData['data']);
  	}
  }

	private function _actionEcho($text)
	{
		$encodedData = $this->_encodeData('echo', $text);
		foreach($this->_clients as $sendto)
		{
			$sendto->send($encodedData);
    }
	}
}
